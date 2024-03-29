import clsx from 'clsx'
import { format, parse } from 'date-fns'

import snowdownLogo from '@/assets/icons/spartan_snowdown.png'
import { Button } from '@/components/Elements/Button'
// import { HCSLogo } from '@/components/Elements/HCSLogo'

import Calendar from '~icons/mdi/calendar-outline'
import CalendarStar from '~icons/mdi/calendar-star'
import Earth from '~icons/mdi/earth'
import Location from '~icons/mdi/map-marker'
import TableView from '~icons/mdi/table'
import Trophy from '~icons/mdi/trophy'

type ScheduleHeaderProps = {
  title: string
  location?: string
  prizePool?: number
  isOnline?: boolean
  startDate: string
  endDate: string
  view: 'calendar' | 'table'
  setView: (val: 'calendar' | 'table') => void
}
export const ScheduleHeader = ({
  title,
  location,
  prizePool = 0,
  isOnline,
  startDate,
  endDate,
  view,
  setView,
}: ScheduleHeaderProps) => {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const formatStart = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'MMM dd') : ''
  const formatEnd = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'MMM dd') : ''
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
      <div className="md:flex md:flex-flow md:flex-nowrap items-center">
        <img
          src={snowdownLogo}
          alt="Spartan Snowdown Logo"
          className="hidden md:dark:inline-block h-12 md:h-24 w-auto mx-8"
        />
        {/* <HCSLogo
          className="hidden md:dark:inline-block h-12 md:h-24 w-auto mx-8"
          primary="transparent"
          background="#ffffff99"
          outline="transparent"
        />
        <HCSLogo
          className="hidden md:inline-block md:dark:hidden h-12 md:h-24 w-auto mx-8"
          primary="#000000aa"
          background="#33333344"
          outline="transparent"
        /> */}
        <div className="flex flex-col w-full">
          <div className="touranment-title col-span-full text-[2.5rem] font-super-bold w-full">
            {title}
          </div>
          <div className="flex flex-wrap md:flex-nowrap items-center w-full">
            {!isOnline ? (
              <div className="location flex min-w-fit text-sm items-center mr-4">
                <Location className="mr-1" />
                <span>{location}</span>
              </div>
            ) : (
              <div className="location location-online flex min-w-fit text-sm items-center mr-4">
                <Earth className="mr-1" />
                Online
              </div>
            )}

            <div className="prizePool flex min-w-fit text-sm items-center mr-4">
              <Trophy className="mr-1" />
              <span>{formatter.format(prizePool)}</span>
            </div>
            <div className="tournament-dates flex min-w-fit text-sm items-center mr-4">
              <CalendarStar className="mr-1" />
              <span>
                {formatStart} - {formatEnd}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-col xl:flex-row justify-end mt-4 lg:mt-0">
        <Button
          className={clsx(
            'border-0 max-w-30 mr-2 lg:mb-2 lg:mr-0 lg:max-w-full xl:m-0 xl:mr-2 text-white',
            view === 'table' ? 'themeGradient' : 'dark:bg-gray-700/30 bg-gray-700/70'
          )}
          size="sm"
          startIcon={<TableView />}
          onClick={() => setView('table')}
        >
          Table View
        </Button>
        <Button
          className={clsx(
            'border-0 max-w-30 text-white',
            view === 'calendar' ? 'themeGradient' : 'dark:bg-gray-700/30 bg-gray-700/70'
          )}
          size="sm"
          startIcon={<Calendar />}
          onClick={() => setView('calendar')}
        >
          Calendar
        </Button>
      </div>
    </div>
  )
}
