import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const PostList = dynamic(() => import('@/components/shared/PostList'), { ssr: false })
const SectionNavigation = dynamic(() => import('@/components/shared/SectionNavigation'), { ssr: false })

export type SectionNavItem = {
    label: string
    href: string | null
    number: number
}

export const metadata: Metadata = {
    title: 'Blog | Next App',
}

const Blog = async () => {
    const sectionNavItems: SectionNavItem[] = [
        {
            label: 'Опубликовано',
            href: null,
            number: 8,
        },
        {
            label: 'На модерации',
            href: 'moderation',
            number: 1,
        },
        {
            label: 'Черновики',
            href: 'draft',
            number: 0,
        },
        {
            label: 'Архив',
            href: 'archive',
            number: 0,
        },
    ]

    return (
        <section className="container-sm mx-auto flex flex-1 flex-col">
            <header className="mt-10 flex flex-col">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Статьи</h1>
                    <Button asChild size="icon">
                        <Link href="/blog/choice">
                            <Plus size={20} />
                        </Link>
                    </Button>
                </div>

                <SectionNavigation navLinks={sectionNavItems} className="mt-5" />
            </header>

            <PostList className="mb-12 mt-6 flex flex-col gap-y-2" />
        </section>
    )
}

export default Blog
