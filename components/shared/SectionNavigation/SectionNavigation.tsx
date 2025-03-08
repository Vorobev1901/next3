'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { SectionNavItem } from '@/app/blog/page'
import { Badge } from '@/components/ui/badge'
import { useSearchParams } from 'next/navigation'

type Props = {
    navLinks: SectionNavItem[]
    className?: string
}

const SectionNavigation = (props: Props) => {
    const { navLinks, className } = props

    const searchParams = useSearchParams()

    return (
        <nav className={cn(className, '')}>
            <ul className="flex justify-between gap-y-1 overflow-x-auto w-[calc(100%_+_32px)] md:w-full -ml-4 md:ml-0 border-b border-gray-200 px-4 md:px-0">
                {navLinks.map(({ label, href, number }) => (
                    <li key={href}>
                        <Link
                            className={cn(
                                'flex items-center gap-x-1.5 whitespace-nowrap border-b-2 border-transparent py-3 font-medium text-gray-500 transition-colors duration-300 hover:text-primary',
                                {
                                    'border-primary text-black-900':
                                        href === searchParams.get('status') || href === '/articles',
                                },
                                !!number ? 'px-4 md:px-0.5' : 'px-4'
                            )}
                            href={href ? `/articles?status=${href}` : '/articles'}
                        >
                            <span>{label}</span>
                            {!!number && (
                                <Badge
                                    className="rounded-full px-1.5"
                                    variant={'default'}
                                >
                                    {number}
                                </Badge>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default SectionNavigation
