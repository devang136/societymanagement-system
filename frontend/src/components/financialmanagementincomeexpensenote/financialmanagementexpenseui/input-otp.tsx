import * as React from "react"
import { OTPInput, OTPInputProps } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

interface InputOTPRootProps extends Omit<OTPInputProps, "children"> {
  maxLength: number
}

const InputOTPRoot = React.forwardRef<HTMLDivElement, InputOTPRootProps>(
  ({ className, ...props }, ref) => (
    <OTPInput ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
  )
)
InputOTPRoot.displayName = "InputOTPRoot"

interface InputOTPSlotProps {
  isActive: boolean
  char?: string
  hasFakeCaret: boolean
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ char, isActive, hasFakeCaret }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-10 w-10 rounded-md text-sm ring-offset-background transition-all",
          "border border-input hover:bg-accent hover:text-accent-foreground",
          "flex items-center justify-center",
          isActive && "ring-2 ring-offset-2 ring-ring"
        )}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret h-4 w-px bg-foreground duration-500" />
          </div>
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

interface InputOTPSeparatorProps extends React.ComponentProps<"div"> {}

const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  )
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTPRoot, InputOTPSlot, InputOTPSeparator }
