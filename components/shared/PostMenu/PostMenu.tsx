'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { EllipsisVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@/components/ui/dialog'
import React from 'react'

type Props = {
    className?: string
    id: number
}

const PostMenu = (props: Props) => {
    const { id, className } = props

    const menuButtons = [
        {
            label: 'Редактировать',
        },
        {
            label: 'В архив',
        },
        {
            label: 'Удалить статью',
        },
    ]

    const title = 'Модальное окно'
    const description = 'Выберите дейсвие для статьи'
    const buttonTitle = 'Открыть модальное окно'

    const lastIndex = menuButtons.length - 1

    return (
        <>
            <div className={cn(className, 'md:hidden')}>
                <Drawer>
                    <DrawerTrigger
                        asChild
                        onClick={(e) => {
                            e.currentTarget.blur()
                        }}
                    >
                        <Button variant="secondary" size="icon" aria-label={buttonTitle} title={buttonTitle}>
                            <EllipsisVertical className="text-primary" size={20} />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="p-0">
                            <DialogTitle className="sr-only">{title}</DialogTitle>
                            <DrawerDescription className="sr-only">{description}</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col items-center gap-y-4 p-4">
                            {menuButtons.map(({ label }, i) => (
                                <DrawerClose asChild key={i}>
                                    <Button
                                        type="button"
                                        variant={i === lastIndex ? 'destructive' : 'ghost'}
                                        size="sm"
                                        className={cn('w-full text-sm font-normal')}
                                        onClick={() => console.log(id)}
                                    >
                                        {label}
                                    </Button>
                                </DrawerClose>
                            ))}
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className={cn(className, 'hidden md:block')}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" aria-label={buttonTitle} title={buttonTitle}>
                            <EllipsisVertical className="text-primary" size={20} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {menuButtons.map(({ label }, i) => (
                            <DropdownMenuItem key={i} asChild>
                                <Button
                                    type="button"
                                    variant={i === lastIndex ? 'destructive' : 'ghost'}
                                    size="sm"
                                    className={cn('w-full cursor-pointer justify-start text-sm font-normal')}
                                    onClick={() => console.log(id)}
                                >
                                    {label}
                                </Button>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

export default PostMenu
