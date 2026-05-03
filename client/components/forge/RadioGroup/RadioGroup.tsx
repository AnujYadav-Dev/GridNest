'use client'

import { forwardRef, useId, useState } from 'react'
import { clsx } from 'clsx'
import { RadioGroupProps } from './RadioGroup.types'

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, name, options, value, defaultValue, onValueChange, ...props }, ref) => {
    const groupId = useId()
    const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value)
    const currentValue = value ?? internalValue

    function handleChange(nextValue: string) {
      setInternalValue(nextValue)
      onValueChange?.(nextValue)
    }

    return (
      <div ref={ref} role="radiogroup" className={clsx('flex flex-col gap-3', className)} {...props}>
        {options.map((option) => {
          const id = `${groupId}-${option.value}`
          return (
            <label key={option.value} htmlFor={id} className={clsx('flex cursor-pointer items-start gap-3 text-sm', option.disabled && 'cursor-not-allowed opacity-50')}>
              <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  id={id}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={currentValue === option.value}
                  disabled={option.disabled}
                  onChange={() => handleChange(option.value)}
                  className="peer h-5 w-5 appearance-none rounded-full border border-[var(--gridnest-border)] bg-[var(--gridnest-surface-2)] transition-colors checked:border-[var(--gridnest-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gridnest-accent)] focus-visible:ring-offset-2"
                />
                <span className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-[var(--gridnest-accent)] opacity-0 transition-opacity peer-checked:opacity-100" />
              </span>
              <span>
                <span className="block font-medium text-[var(--gridnest-text-primary)]">{option.label}</span>
                {option.description && <span className="mt-0.5 block text-xs text-[var(--gridnest-text-secondary)]">{option.description}</span>}
              </span>
            </label>
          )
        })}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
export default RadioGroup
