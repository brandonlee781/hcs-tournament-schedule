import { supabase } from '@/lib/supabase'
import { definitions } from '@/types/database'

import { EventData, TournamentDayIds } from '../types'

type TournamentResponse = definitions['tournament'] & {
  days: (Omit<definitions['tournament-day'], 'name'> & {
    name: TournamentDayIds
    events: (Omit<definitions['events'], 'data'> & {
      data: EventData<string>
    })[]
    streams: string[]
  })[]
  pools: (Omit<definitions['pools'], 'teams'> & { teams: string[] })[]
}

export async function getTournament(id?: string) {
  const { data, error } = await supabase
    .from('tournament')
    .select<string, TournamentResponse>(
      `
      id,
      title,
      liquipediaLink,
      timezone,
      location,
      prizePool,
      isOnline,
      startDate,
      endDate,
      days:tournament-day(
        id,
        name,
        date,
        include,
        events (
          id,
          time,
          duration,
          data,
          streams
        ),
        streams
      ),
      pools (
        id,
        key,
        name,
        teams,
        created_at
      )
    `
    )
    .match(id ? { id } : { isPast: false })
    .single()

  const allStreams = Array.from(
    new Set(data?.days.map(d => d.streams).reduce((a, b) => a.concat(b), []) ?? [])
  )
  const { data: streams } = await supabase.from('streams').select().in('id', allStreams)

  if (error) {
    throw new Error(error.message)
  }

  return {
    ...data,
    days: data.days.map(day => {
      return {
        ...day,
        streams: day.streams.map(stream => {
          return streams?.find(s => stream === s?.id)
        }),
      }
    }),
  }
}
