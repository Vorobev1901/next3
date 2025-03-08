import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, WandSparkles, X, Angry, Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import Preloader from '@/components/shared/Preloader'
import Tooltip from '@/components/ui/extension/Tooltip'

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva({
    variants: {
        variant: {
            default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
            secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            inverted: 'inverted',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
    /**
     * An array of option objects to be displayed in the multi-select component.
     * Each option object has a label, value, and an optional icon.
     */
    options: {
        id: string
        name: string
    }[]

    /**
     * Callback function triggered when the selected values change.
     * Receives an array of the new selected values.
     */
    onValueChange: (value: string[]) => void

    /** The default selected values when the component mounts. */
    defaultValue?: string[]

    /**
     * Placeholder text to be displayed when no values are selected.
     * Optional, defaults to "Select options".
     */
    placeholder?: string

    /**
     * Animation duration in seconds for the visual effects (e.g., bouncing badges).
     * Optional, defaults to 0 (no animation).
     */
    animation?: number

    /**
     * Maximum number of items to display. Extra selected items will be summarized.
     * Optional, defaults to 3.
     */
    maxCount?: number

    /**
     * The modality of the popover. When set to true, interaction with outside elements
     * will be disabled and only popover content will be visible to screen readers.
     * Optional, defaults to false.
     */
    modalPopover?: boolean

    /**
     * If true, renders the multi-select component as a child of another component.
     * Optional, defaults to false.
     */
    asChild?: boolean

    className?: string
    isLoading?: boolean
    commandEmpty?: string
    label?: string
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
    (
        {
            options,
            onValueChange,
            defaultValue = [],
            placeholder = 'Выберите теги',
            animation = 0,
            maxCount = 3,
            modalPopover = false,
            asChild = false,
            className,
            isLoading,
            label,
            commandEmpty = 'Такой тег не найден',
            ...props
        },
        ref
    ) => {
        const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue)
        const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
        const [isAnimating, setIsAnimating] = React.useState(false)

        const removeButtonTitle = 'Удалить тег'
        const removeButtonExtraOptionsTitle = 'Удалить теги'
        const removeButtonAllOptionsTitle = 'Удалить все теги'

        const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                setIsPopoverOpen(true)
            } else if (event.key === 'Backspace' && !event.currentTarget.value) {
                const newSelectedValues = [...selectedValues]
                newSelectedValues.pop()
                setSelectedValues(newSelectedValues)
                onValueChange(newSelectedValues)
            }
        }

        const toggleOption = (option: string) => {
            const newSelectedValues = selectedValues.includes(option)
                ? selectedValues.filter((value) => value !== option)
                : [...selectedValues, option]
            setSelectedValues(newSelectedValues)
            onValueChange(newSelectedValues)
        }

        const handleClear = () => {
            setSelectedValues([])
            onValueChange([])
        }

        const handleTogglePopover = () => {
            setIsPopoverOpen((prev) => !prev)
        }

        const clearExtraOptions = () => {
            const newSelectedValues = selectedValues.slice(0, maxCount)
            setSelectedValues(newSelectedValues)
            onValueChange(newSelectedValues)
        }

        return (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        {...props}
                        onClick={handleTogglePopover}
                        className={cn(
                            'group flex min-h-10 w-full items-center justify-between rounded-md border border-transparent bg-gray-80 px-3 py-1.5 text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:bg-gray-80 focus-visible:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:border-blue-400 md:text-sm lg:h-auto',
                            className
                        )}
                    >
                        {selectedValues.length > 0 ? (
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-wrap items-center gap-1">
                                    {selectedValues.slice(0, maxCount).map((value) => {
                                        const option = options.find((o) => o.name === value)
                                        return (
                                            <Badge
                                                key={value}
                                                className={cn(
                                                    'flex items-center gap-2 rounded-md border-none px-2 py-1 font-normal text-black'
                                                )}
                                                variant={'ghost'}
                                            >
                                                {option?.name}
                                                <Tooltip title={removeButtonTitle} asChild>
                                                    <X
                                                        size={14}
                                                        strokeWidth={1.25}
                                                        className="cursor-pointer text-gray-500 hover:text-black"
                                                        onClick={(event) => {
                                                            event.stopPropagation()
                                                            toggleOption(value)
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Badge>
                                        )
                                    })}
                                    {selectedValues.length > maxCount && (
                                        <Badge
                                            className={cn(
                                                'flex items-center gap-2 rounded-md border border-primary bg-white px-2 py-1 font-semibold text-black'
                                            )}
                                            variant={'ghost'}
                                        >
                                            {`+ ${selectedValues.length - maxCount} еще`}
                                            <Tooltip title={removeButtonExtraOptionsTitle} asChild>
                                                <X
                                                    className="cursor-pointer text-gray-500 hover:text-black"
                                                    size={14}
                                                    strokeWidth={1.25}
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        clearExtraOptions()
                                                    }}
                                                />
                                            </Tooltip>
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <Tooltip title={removeButtonAllOptionsTitle} asChild>
                                        <X
                                            size={16}
                                            strokeWidth={1.25}
                                            className="mx-2 h-4 cursor-pointer text-gray-500 hover:text-black"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                handleClear()
                                            }}
                                        />
                                    </Tooltip>
                                    <Separator orientation="vertical" className="flex h-full min-h-6" />
                                    <ChevronDown
                                        size={16}
                                        strokeWidth={1.25}
                                        className="ml-2 cursor-pointer text-gray-500 transition-transform duration-300 hover:text-black group-data-[state=open]:rotate-180"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="mx-auto flex w-full items-center justify-between">
                                <span className="text-sm font-normal text-muted-foreground">{label}</span>
                                <ChevronDown
                                    size={16}
                                    strokeWidth={1.25}
                                    className="cursor-pointer text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180"
                                />
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-[calc(100vw_-_52px)] max-w-[513px] p-0 md:w-[513px]"
                    align={'start'}
                    onEscapeKeyDown={() => setIsPopoverOpen(false)}
                >
                    <Command>
                        <CommandInput placeholder={placeholder} className="h-9" onKeyDown={handleInputKeyDown} />
                        <CommandList>
                            {!isLoading && (
                                <CommandEmpty className="flex items-center gap-x-2 px-3 py-2 text-sm text-black-900">
                                    <>
                                        <span>{commandEmpty}</span>
                                        <Angry size={16} strokeWidth={1.25} />
                                    </>
                                </CommandEmpty>
                            )}
                            <CommandGroup>
                                {isLoading ? (
                                    <Preloader size={16} className="h-9" />
                                ) : (
                                    options.map((option) => {
                                        const isSelected = selectedValues.includes(option.name)
                                        return (
                                            <CommandItem
                                                key={option.name}
                                                onSelect={() => toggleOption(option.name)}
                                                className={cn('ml-auto cursor-pointer', isSelected ? 'opacity-50' : 'opacity-100')}
                                            >
                                                <span>{option.name}</span>
                                                <Check className={cn('ml-auto', isSelected ? 'opacity-100' : 'opacity-0')} />
                                            </CommandItem>
                                        )
                                    })
                                )}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
                {animation > 0 && selectedValues.length > 0 && (
                    <WandSparkles
                        className={cn(
                            'my-2 h-3 w-3 cursor-pointer bg-background text-foreground',
                            isAnimating ? '' : 'text-muted-foreground'
                        )}
                        onClick={() => setIsAnimating(!isAnimating)}
                    />
                )}
            </Popover>
        )
    }
)

MultiSelect.displayName = 'MultiSelect'
