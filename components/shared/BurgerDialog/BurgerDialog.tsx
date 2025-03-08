import { NavLink } from '@/layout/Header/Header'
import { cn } from '@/lib/utils'
import Navigation from '@/components/shared/Navigation'
import Image from 'next/image'
import language from '@/public/language.png'
import { Separator } from '@/components/ui/separator'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import user from '@/public/user-menu.png'
import Profile from '@/components/shared/Profile/Profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
    isOpen: boolean
    className?: string
    navLinks: NavLink[]
    actions: NavLink[]
}

const BurgerDialog = (props: Props) => {
    const { isOpen = false, navLinks, actions, className } = props

    return (
        <dialog
            className={cn(
                className,
                'fixed inset-0 h-full w-full flex-col justify-start overflow-y-auto bg-white px-4 py-14 open:flex lg:gap-y-6'
            )}
            open={isOpen}
        >
            <Link className="flex items-center gap-x-4 lg:hidden" href={'/'}>
                <Avatar className="cursor-pointer w-20 h-20 rounded-lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>МС</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-x-1">
                    <span className="font-bold text-lg">Морти Смит</span>
                    <span className="text-base text-gray-500">+971 55 530 2534 </span>
                </div>
            </Link>

            <Separator className="my-6 lg:hidden" />

            <Navigation
                navLinks={navLinks}
                className="flex flex-col gap-y-6 lg:flex-row lg:justify-between"
            />

            <Separator className="my-6 lg:hidden" />

            <div className="flex flex-col justify-end lg:flex-row lg:items-center lg:gap-y-2.5">
                <div className="inline-flex h-5 w-5 flex-none cursor-pointer gap-x-2.5">
                    <Image className="flex-none" src={language} alt="" />
                    <span className="inline-flex lg:hidden">English</span>
                </div>

                <Separator className="my-6 lg:hidden" />

                <Navigation
                    navLinks={actions}
                    className="flex flex-col gap-x-2.5 gap-y-6 lg:ml-2.5 lg:flex-row"
                    classNameLabel="inline-block lg:hidden"
                    classNameItem="lg:last-of-type:hidden"
                />

                <Separator className="my-6 lg:hidden" />

                <button className="flex items-center gap-x-2.5 self-start font-semibold text-destructive hover:text-destructive/80 lg:hidden">
                    <LogOut size={20} />
                    <span>Выйти</span>
                </button>


                <Profile className="ml-12 hidden lg:inline-flex"/>
            </div>
        </dialog>
    )
}

export default BurgerDialog
