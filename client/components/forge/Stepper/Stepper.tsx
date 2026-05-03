'use client'

import { forwardRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { clsx } from 'clsx'
import { StepperProps } from './Stepper.types'

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ className, value, defaultValue = 0, min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const currentValue = value ?? internalValue

    function update(nextValue: number) {
      const clamped = Math.min(max, Math.max(min, nextValue))
      setInternalValue(clamped)
      onValueChange?.(clamped)
    }

    return (
      <div ref={ref} className={clsx('inline-flex h-10 items-center overflow-hidden rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface-2)]', className)} {...props}>
        <button type="button" onClick={() => update(currentValue - step)} disabled={currentValue <= min} className="flex h-full w-10 items-center justify-center text-[var(--gridnest-text-secondary)] transition-colors hover:bg-[var(--gridnest-surface)] hover:text-[var(--gridnest-text-primary)] disabled:pointer-events-none disabled:opacity-40">
          <Minus size={14} />
        </button>
        <output className="min-w-12 px-3 text-center font-mono text-sm text-[var(--gridnest-text-primary)]">{currentValue}</output>
        <button type="button" onClick={() => update(currentValue + step)} disabled={currentValue >= max} className="flex h-full w-10 items-center justify-center text-[var(--gridnest-text-secondary)] transition-colors hover:bg-[var(--gridnest-surface)] hover:text-[var(--gridnest-text-primary)] disabled:pointer-events-none disabled:opacity-40">
          <Plus size={14} />
        </button>
      </div>
    )
  }
)

Stepper.displayName = 'Stepper'
export default Stepper
