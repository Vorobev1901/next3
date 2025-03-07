import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'flex min-h-[80px] w-full rounded-md border border-transparent bg-gray-80 px-3 py-2 text-sm font-normal placeholder:text-gray-500 focus-visible:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm outline-none focus:outline-none',
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = 'Textarea'

export { Textarea }
