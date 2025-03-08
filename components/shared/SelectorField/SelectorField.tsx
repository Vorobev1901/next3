'use client'

import { Check, ChevronDown, Angry, CircleAlert } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import Preloader from '@/components/shared/Preloader'
import { FormEventHandler } from 'react'
import Tooltip from '@/components/ui/extension/Tooltip'
import { SelectorOption } from '@/components/shared/PostForm/type'
import { FormType } from '@/components/shared/PostForm/formSchema'

type Props = {
    items: SelectorOption[]
    placeholder: string
    label: string
    name: 'country' | 'city'
    commandEmpty: string
    isLoading: boolean
    disabled?: boolean
    onSelectValue?: () => void
    onChangeValue?: FormEventHandler<HTMLInputElement>
    control: UseFormReturn<FormType>['control']
    setValue: UseFormReturn<FormType>['setValue']
    clearErrors: UseFormReturn<FormType>['clearErrors']
    commandInput?: string
    tooltip?: string
    title?: string
}

export default function SelectorField(props: Props) {
    const {
        items,
        placeholder,
        label,
        title,
        name,
        control,
        commandEmpty,
        isLoading,
        disabled = false,
        onSelectValue,
        onChangeValue,
        setValue,
        clearErrors,
        tooltip,
    } = props

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-2 space-y-0">
                        <FormLabel className="flex items-center gap-x-1">
                            <span>{title}</span>
                            {tooltip && disabled && (
                                <Tooltip title={tooltip}>
                                    <CircleAlert size={16} strokeWidth={1.5} />
                                </Tooltip>
                            )}
                        </FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <button
                                        disabled={disabled}
                                        type={'button'}
                                        role="combobox"
                                        className={cn(
                                            'group flex h-10 w-full items-center justify-between rounded-md border border-transparent bg-gray-80 px-3 py-2 text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:border-blue-400 md:text-sm',
                                            {
                                                'text-gray-500': !field.value,
                                            }
                                        )}
                                    >
                                        <span>{field.value?.intName ? field.value?.intName : label}</span>
                                        <ChevronDown
                                            size={16}
                                            className="opacity-50 transition-transform duration-300 group-data-[state=open]:rotate-180"
                                        />
                                    </button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="max-w-[513px] w-[calc(100vw_-_52px)] p-0 md:w-[252px]" align={'start'}>
                                <Command>
                                    <CommandInput placeholder={placeholder} className="h-9" onInput={onChangeValue} />
                                    <CommandList>
                                        {!isLoading && (
                                            <CommandEmpty className="flex items-center gap-x-2 px-3 py-2 text-sm text-black-900">
                                                <>
                                                    <span>{commandEmpty}</span>
                                                    <Angry size={16} strokeWidth={1.25} />
                                                </>
                                            </CommandEmpty>
                                        )}
                                        {isLoading ? (
                                            <Preloader size={16} className="h-9" />
                                        ) : (
                                            !!items.length && (
                                                <CommandGroup>
                                                    {items.map((item) => (
                                                        <CommandItem
                                                            disabled={field.value && item.intName === field.value.intName}
                                                            value={item.intName}
                                                            key={item.id}
                                                            onSelect={() => {
                                                                setValue(name, item)
                                                                clearErrors(name)
                                                                onSelectValue && onSelectValue()
                                                            }}
                                                        >
                                                            {item.intName}
                                                            <Check
                                                                className={cn(
                                                                    'ml-auto',
                                                                    field.value && item.intName === field.value.intName
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0'
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            )
                                        )}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}
