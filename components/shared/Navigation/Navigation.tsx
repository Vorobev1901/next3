'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { DynamicIcon } from 'lucide-react/dynamic'
import { NavLink } from '@/layout/Header/Header'
import Link from 'next/link'

type Props = {
    navLinks: NavLink[]
    className?: string
    classNameLabel?: string
    classNameItem?: string
}

const Navigation = (props: Props) => {
    const { navLinks, className, classNameLabel, classNameItem } = props

    const url = usePathname()

    return (
        <nav>
            <ul className={cn(className)}>
                {navLinks.map(({ label, href, icon }) => (
                    <li className={classNameItem} key={href}>
                        <Link
                            className={cn(
                                'flex gap-x-1 text-black-900 hover:text-primary items-center leading-none',
                                {
                                    'text-primary': href === url,
                                }
                            )}
                            href={href}
                        >
                            <DynamicIcon
                                name={icon}
                                size={22}
                                strokeWidth={2}
                            />
                            <span className={classNameLabel}>{label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation
