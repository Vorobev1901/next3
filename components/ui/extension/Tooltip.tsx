import { Tooltip as TooltipContainer, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ReactNode } from 'react'

type Props = {
    title: string
    className?: string
    children: ReactNode
    asChild?: boolean
    type?: 'button' | 'submit' | 'reset' | undefined
}

const Tooltip = (props: Props) => {
    const { title, className, children, asChild, type = 'button' } = props
    return (
        <TooltipProvider>
            <TooltipContainer>
                <TooltipTrigger type={type} className={className} asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="text-[12px]/none font-semibold">
                    <p>{title}</p>
                </TooltipContent>
            </TooltipContainer>
        </TooltipProvider>
    )
}

export default Tooltip
