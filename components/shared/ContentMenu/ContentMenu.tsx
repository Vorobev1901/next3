'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@/components/ui/dialog'
import { v4 as uuid } from 'uuid';

type Props = {
    className?: string
    append: any
    pushPreviewState: () => void
}

const ContentMenu = (props: Props) => {
    const { className, append, pushPreviewState } = props

    const isArray = (type: string) => {
        return type === 'array'
    }

    const menuButtons = [
        {
            label: 'Подзаголовок',
            name: '',
            type: 'text',
        },
        {
            label: 'Текст',
            name: '',
            type: 'textarea',
        },
        {
            label: 'Фото',
            name: [
                {
                    name: undefined,
                    type: 'file',
                },
                {
                    name: '',
                    type: 'text',
                },
            ],
            type: 'array',
        },
    ]

    const title = 'Модальное окно'
    const description = 'Выберите дейсвие для формы'
    const buttonLabel = 'Добавить секцию'

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
                        <Button className="flex w-full items-center gap-x-2" type="button" variant="default" size="sm">
                            <Plus size={14} />
                            <span>{buttonLabel}</span>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent onCloseAutoFocus={(e) => e.preventDefault()}>
                        <DrawerHeader className="p-0">
                            <DialogTitle className="sr-only">{title}</DialogTitle>
                            <DrawerDescription className="sr-only">{description}</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col items-stretch gap-y-2 p-4">
                            {menuButtons.map(({ label, name, type }, i) => (
                                <DrawerClose asChild key={i}>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-sm font-normal text-black"
                                        onClick={() => {
                                            append({ name, type, id: uuid() })
                                            if(isArray(type)) {
                                                pushPreviewState()
                                            }
                                        }}
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
                        <Button className="flex w-full items-center gap-x-2" type="button" variant="default" size="sm">
                            <Plus size={14} />
                            <span>{buttonLabel}</span>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()} className="flex flex-col md:w-[545px]">
                        {menuButtons.map(({ label, name, type }, i) => (
                            <DropdownMenuItem key={i} asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-sm font-normal text-black cursor-pointer justify-start"
                                    onClick={() => {
                                        append({ name, type, id: uuid() })
                                        if(isArray(type)) {
                                            pushPreviewState()
                                        }
                                    }}
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

export default ContentMenu
