import clsx from 'clsx'

import { Team } from '@/features/teams'

import styles from './ScheduleTableData.module.css'

type ScheduleTableDataProps = {
  highlight?: Team
  colSpan?: number
} & React.HTMLAttributes<HTMLTableCellElement>
export const ScheduleTableData = forwardRef<HTMLTableCellElement, ScheduleTableDataProps>(
  ({ children, className, highlight, colSpan = 1 }, ref) => {
    const highlightColor = highlight?.color ?? 'transparent'

    return (
      <td
        ref={ref}
        className={clsx(
          'p-2 whitespace-nowrap relative border-4 first:border-l-0 first:border-b-0 dark:border-hcsDark-800 border-white last:border-0',
          className
        )}
        colSpan={colSpan}
      >
        <div className={styles.background} style={{ borderColor: highlightColor }}></div>
        <div
          className={clsx(
            'h-full w-full text-sm font-medium data-slot underline decoration-3 md:no-underline'
          )}
          style={{ textDecorationColor: highlightColor }}
        >
          {children}
        </div>
      </td>
    )
  }
)

ScheduleTableData.displayName = 'ScheduleTableData'
