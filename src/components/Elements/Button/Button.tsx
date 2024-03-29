import clsx from 'clsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '../Spinner'

const sizes = {
  xs: 'py-1 px-2 text-xs',
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
}

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof sizes
  isLoading?: boolean
  to?: string
} & IconProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      to,
      onClick,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate()
    const clickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (to) {
        navigate(to)
      }
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
          sizes[size],
          className
        )}
        {...props}
        onClick={e => clickButton(e)}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
