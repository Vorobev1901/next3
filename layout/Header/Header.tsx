'use server'

import { cn } from '@/lib/utils'
import Logo from '@/components/shared/Logo'
import { IconName } from 'lucide-react/dynamic'
import BurgerMenu from '@/components/shared/BurgerMenu'

import styles from './Header.module.css'

export type NavLink = {
    label: string
    href: string
    icon: IconName
}

const Header = () => {
    const navLinks: NavLink[] = [
        {
            label: 'Заказы',
            href: '/orders',
            icon: 'mail-search',
        },
        {
            label: 'Отклики',
            href: '/requests',
            icon: 'mail-check',
        },
        {
            label: 'Статьи',
            href: '/blog',
            icon: 'book-open-text',
        },
        {
            label: 'Кошелек',
            href: '/wallet',
            icon: 'wallet',
        },
    ]

    const actions: NavLink[] = [
        {
            label: 'FAQ',
            href: '/faq',
            icon: 'circle-help',
        },
        {
            label: 'Поддержка',
            href: '/support',
            icon: 'headset',
        },
        {
            label: 'Уведомления',
            href: '/notifications',
            icon: 'bell',
        },
    ]

    return (
        <header className={cn(styles.scrollingAnimation, styles.header)}>
            <div className="container">
                <div className="grid grid-cols-[auto_auto] justify-between lg:justify-normalu items-center lg:grid-cols-[1fr_minmax(0,545px)_1fr]">
                    <Logo loading="eager" />
                    <BurgerMenu
                        navLinks={navLinks}
                        actions={actions}
                        classNameDialog="lg:contents"
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
