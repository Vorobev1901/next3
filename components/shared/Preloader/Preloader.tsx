import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
    size?: number | string
    className?: string
}

const Preloader = (props: Props) => {
    const { size = 20, className } = props

    return (
        <div className={cn(className, 'flex flex-1 items-center justify-center')}>
            <Loader2 size={size} className="animate-spin text-primary" />
        </div>
    )
}

export default Preloader
