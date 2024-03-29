import {
  addHours,
  addSeconds,
  eachHourOfInterval,
  endOfHour,
  format,
  parse,
  startOfHour,
} from 'date-fns'

import { TournamentDay } from '@/features/tournament'

import { parseTime } from '../../utils/parseTime'

type CalendarGridContextData = {
  days: TournamentDay[]
  hours: Date[]
  columns: number
  gridPosition: string
}
export const CalendarGridContext = createContext<CalendarGridContextData>({
  days: [],
  hours: [],
  columns: 1,
  gridPosition: '',
})

type CalendarGridProviderProps = {
  days: TournamentDay[]
  columns: number
  children: React.ReactNode
}
export const CalendarGridProvider = ({ children, days, columns }: CalendarGridProviderProps) => {
  const timeArray = days
    .map(d => d.events)
    .filter(Boolean)
    .reduce((a, b) => a.concat(b), [])
    .map(e => e.time)
    .sort()
    .map(i => {
      return i && parseTime(i)
    })
    .filter(Boolean)
  const uniqueTimes = timeArray
    .filter((date, i, self) => self.findIndex(d => d.getTime() === date.getTime()) === i)
    .sort()

  const firstTime = uniqueTimes[0]
  const lastTime = uniqueTimes[uniqueTimes.length - 1]

  const gridPosition = 'absolute top-12 lg:top-4 bottom-0 right-0 left-0'

  if (!firstTime || !lastTime) {
    return (
      <CalendarGridContext.Provider value={{ days, hours: [], columns, gridPosition }}>
        {children}
      </CalendarGridContext.Provider>
    )
  }

  const firstEvent = parse(format(firstTime, 'HH:mm:ss'), 'HH:mm:ss', new Date())
  const lastEvent = parse(format(lastTime, 'HH:mm:ss'), 'HH:mm:ss', new Date())

  const start = startOfHour(firstEvent)
  const end = addHours(addSeconds(endOfHour(lastEvent), 1), 1)

  const hours = eachHourOfInterval({ start, end })

  return (
    <CalendarGridContext.Provider value={{ days, hours, columns, gridPosition }}>
      {children}
    </CalendarGridContext.Provider>
  )
}
