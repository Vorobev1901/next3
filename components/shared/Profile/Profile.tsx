'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

import Link from 'next/link'
import { LogOut, Settings, Star } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

type Props = {
    className?: string
}

const Profile = (props: Props) => {
    return (
        <div className="ml-12 hidden lg:inline-flex">
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>РМ</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mt-2 px-0">
                    <div className="flex flex-col">
                        <Link
                            className="flex items-center gap-x-4 px-4"
                            href={'/'}
                        >
                            <Avatar className="h-10 w-10 cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>МС</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-x-1">
                                <span className="text-base font-bold">
                                    Морти Смит
                                </span>
                                <span className="text-sm text-gray-500">
                                    +971 55 530 2534
                                </span>
                            </div>
                        </Link>

                        <Separator className="my-2" />

                        <Link
                            className="flex gap-x-1 px-4 py-2 text-black-900 hover:bg-gray-80"
                            href="/reviews"
                        >
                            <Star size={22} />
                            <span className="font-sm">Отзывы</span>
                        </Link>

                        <Separator className="my-2" />

                        <Link
                            className="flex gap-x-1 px-4 py-2 text-black-900 hover:bg-gray-80"
                            href="/settings"
                        >
                            <Settings size={22} />
                            <span className="font-sm">Настройки</span>
                        </Link>

                        <button
                            className="flex w-full items-center gap-x-2.5 self-start px-4 py-2 font-medium text-destructive outline-none hover:bg-gray-80 focus:outline-none"
                            type="button"
                        >
                            <LogOut size={20} />
                            <span>Выйти</span>
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Profile
