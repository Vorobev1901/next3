import { Wand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
    className?: string
}

const EmptyPostList = (props: Props) => {
    const { className } = props

    return (
        <div className={className}>
            <div className="flex flex-col gap-y-2">
                <Wand
                    className="self-center text-gray-400"
                    size="100"
                    strokeWidth="1"
                />
                <h2 className="text-center text-lg font-semibold">
                    У вас пока нет статей
                </h2>
                <div className="text-center text-sm">
                    <p>Здесь будут показываться новые статьи</p>
                </div>
                <Button
                    asChild
                    variant="default"
                    className="mt-8 sm:text-lg font-bold"
                >
                    <Link href="/blog/choice">Создать статью</Link>
                </Button>
            </div>
        </div>
    )
}

export default EmptyPostList
