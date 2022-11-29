import { useQuery } from '@tanstack/react-query'
import { getTimezoneOffset } from 'date-fns-tz'

import { Team, useTeams, Region } from '@/features/teams'

import { getTournament } from '../api/getTournament'
import { TournamentDayContext } from '../providers/TournamentDayProvider'
import { Tournament } from '../types'

const getOffset = (timeZone = 'UTC') => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    timeZoneName: 'longOffset' as const,
  }
  const dateText = Intl.DateTimeFormat([], options).format(new Date())

  // Scraping the numbers we want from the text
  // The default value '+0' is needed when the timezone is missing the number part.
  // Ex. Africa/Bamako --> GMT
  const timezoneString = dateText.split(' ')[1].slice(3) || '+0'

  return timezoneString
}

function getTime(timezone: string) {
  const offset = getOffset(timezone)
  return (date: string, time: string) => {
    return `${date}T${time}${offset}`
  }
}

export const getTeam = (teamName: string, teams?: Team[]): Team => {
  const found = teams?.find(t => t.id === teamName)
  if (found) {
    return found
  }
  return {
    id: '',
    name: teamName,
    color: '',
    region: 'NA' as Region.NA,
    image: '',
  }
}

export function useTournament(id?: string) {
  const { day, previousDay, setDay } = useContext(TournamentDayContext)
  const {
    data,
    error,
    isLoading: tournamentLoading,
  } = useQuery(['tournament', id], () => getTournament(id))

  const { data: teams, isLoading: teamsLoading } = useTeams()

  const tournament = useMemo<Tournament | null>(() => {
    if (!data) return null
    const timeFn = getTime(data.timezone || 'UTC')

    return {
      id: data.id,
      liquipediaLink: data.liquipediaLink,
      timezone: data.timezone || 'UTC',
      isPast: data.isPast,

      title: data.title,
      location: data.location,
      prizePool: data.prizePool,
      isOnline: data.isOnline,
      startDate: data.startDate,
      endDate: data.endDate,

      days: data.days.map(d => {
        return {
          ...d,
          events: d.events?.map(ev => {
            return {
              ...ev,
              // time: timeFn(d.date, ev.time),
              streams: ev.streams as string[],
              data: {
                ...ev.data,
                teams: ev.data.teams?.map(t => getTeam(t, teams)),
              },
            }
          }),
        }
      }),
      pools:
        data.pools?.map(pool => {
          return {
            ...pool,
            teams: pool.teams?.map(t => getTeam(t, teams)),
          }
        }) || [],
    }
  }, [data, teams])

  const isLoading = useMemo(() => {
    let val = false
    if (tournamentLoading) val = true
    if (teamsLoading) val = true
    return val
  }, [tournamentLoading, teamsLoading])

  return {
    day,
    previousDay,
    setDay,
    tournament,
    teams,
    error,
    isLoading,
  }
}
