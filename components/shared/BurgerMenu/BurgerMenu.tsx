'use client'

import { NavLink } from '@/layout/Header/Header'
import BurgerButton from '@/components/shared/BurgerButton'
import { useState } from 'react'
import BurgerDialog from '@/components/shared/BurgerDialog'

type Props = {
    navLinks: NavLink[]
    actions: NavLink[]
    classNameButton?: string
    classNameDialog?: string
}

const BurgerMenu = (props: Props) => {
    const { navLinks, actions, classNameButton, classNameDialog } = props

    const [isOpen, setIsOpen] = useState(false)
    const onToggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.classList.toggle('overflow-y-hidden', !isOpen)
    }

    return (
        <>
            <BurgerDialog
                navLinks={navLinks}
                actions={actions}
                isOpen={isOpen}
                className={classNameDialog}
            />
            <BurgerButton
                isOpen={isOpen}
                onToggleMenu={onToggleMenu}
                className={classNameButton}
            />
        </>
    )
}

export default BurgerMenu
