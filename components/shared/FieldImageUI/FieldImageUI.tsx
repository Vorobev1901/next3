import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil, Plus, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getImageData } from '@/utils/functions'
import Tooltip from '@/components/ui/extension/Tooltip'
import { FieldImageUIProps } from './type'

const FieldImageUI = (props: FieldImageUIProps) => {
    const { name, control, preview, onClickRemoveImage, onChangeInput, index } = props

    const removeButtonTitle = 'Удалить фото'
    const avatarTitle = 'Добавить фото'
    const fallbackTitle = 'Изменить фото'

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { onChange, value, ...rest } }) => (
                <FormItem className="flex flex-col items-start group">
                    <p className="text-sm text-gray-500">Фото</p>
                    <div className="relative">
                        {preview && (
                            <Tooltip title={removeButtonTitle} asChild>
                                <Button
                                    className="absolute -right-2 -top-2 z-10 rounded-full text-gray-500 hover:bg-secondary hover:text-black"
                                    type="button"
                                    variant="secondary"
                                    size="icon"
                                    aria-label={removeButtonTitle}
                                    onClick={() => {
                                        onClickRemoveImage(index ?? undefined)
                                        onChange(undefined)
                                    }}
                                >
                                    <X size={14} />
                                </Button>
                            </Tooltip>
                        )}

                        <FormLabel className='group/avatar'>
                            <Avatar className="relative h-24 w-24 cursor-pointer rounded-md group-has-[:focus]:border-blue-400 border border-transparent">
                                {preview && (
                                    <Tooltip title={fallbackTitle} asChild>
                                        <AvatarImage
                                            src={preview}
                                            className="h-full w-full bg-gray-80 rounded-md object-cover object-center transition-opacity duration-300  group-hover/avatar:opacity-70"
                                        />
                                    </Tooltip>
                                )}
                                <Tooltip title={avatarTitle} asChild>
                                    <AvatarFallback className="h-full w-full rounded-md bg-[url('/border.svg')] bg-cover bg-center bg-white transition-opacity duration-300  group-hover/avatar:opacity-70">
                                        <Plus size={24} strokeWidth={1.25} />
                                    </AvatarFallback>
                                </Tooltip>
                                {preview && (
                                    <Pencil
                                        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 transition-opacity duration-300 group-hover/avatar:opacity-100"
                                        size={24}
                                        strokeWidth={1.25}
                                    />
                                )}
                            </Avatar>
                        </FormLabel>
                    </div>
                    <FormControl className="sr-only">
                        <Input
                            className="mt-0 w-min"
                            type="file"
                            {...rest}
                            onChange={(event) => {
                                const data = getImageData(event)
                                if (data) {
                                    const { displayUrl, files } = data
                                    onChangeInput(displayUrl, index)
                                    onChange(files)
                                }
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FieldImageUI
