import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Card } from '@/components/Elements/Card'
import { TeamPoolItem, Pool } from '@/features/pools'
import { Team } from '@/features/teams'

type ParticipantsProps = Pool
export const Participants = ({
  teams,
  name,
  isTable,
}: ParticipantsProps & { isTable?: boolean }) => {
  return (
    <motion.div
      transition={{ type: 'spring' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full"
    >
      <Card className="!p-0 h-full">
        <div
          className={clsx(
            'h-full w-full grid grid-cols-2 grid-rows-[2rem,auto] md:grid-cols-4',
            isTable ? '' : 'xl:flex xl:flex-col'
          )}
        >
          <div className="border-b-2 dark:border-hcsDark-800 border-white flex items-center justify-center col-span-2 md:col-span-4">
            <span>{name}</span>
          </div>
          {teams.map((team: Team, index: number) => (
            <TeamPoolItem
              extraClass="border-r-1 border-hcsDark-800"
              key={team.name}
              {...team}
              lastItem={index === teams.length - 1}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
