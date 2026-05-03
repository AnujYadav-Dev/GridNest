'use client'

import { forwardRef, useId } from 'react'
import { RangeSliderProps } from './RangeSlider.types'

const RangeSlider = forwardRef<HTMLInputElement, RangeSliderProps>(
  ({ label, valueLabel, id, min = 0, max = 100, defaultValue = 50, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className="flex w-full flex-col gap-2">
        {(label || valueLabel) && (
          <div className="flex items-center justify-between gap-3">
            {label && <label htmlFor={inputId} className="text-sm font-medium text-[var(--gridnest-text-primary)]">{label}</label>}
            {valueLabel && <span className="text-xs text-[var(--gridnest-text-muted)]">{valueLabel}</span>}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type="range"
          min={min}
          max={max}
          defaultValue={defaultValue}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--gridnest-surface-2)] accent-[var(--gridnest-accent)]"
          {...props}
        />
      </div>
    )
  }
)

RangeSlider.displayName = 'RangeSlider'
export default RangeSlider
