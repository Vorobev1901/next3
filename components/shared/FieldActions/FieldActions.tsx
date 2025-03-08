import React from 'react'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Tooltip from '@/components/ui/extension/Tooltip'

type Props = {
    index: number
    onClickUp: (index: number) => void
    onClickDown: (index: number) => void
    onClickRemove: (index: number) => void
    length: number
}

const FieldActions = (props: Props) => {
    const { index, onClickUp, onClickDown, onClickRemove, length } = props

    const isLast = index === length - 1
    const ArrowUpTitle = 'Поднять наверх'
    const ArrowDownTitle = 'Опустить вниз'
    const removeButtonTitle = 'Удалить секцию'

    return (
        <>
            <div className="absolute left-1/2 top-4 flex -translate-x-1/2 flex-row gap-1.5 md:-left-7 md:top-1/2 md:-translate-y-1/2 md:flex-col">
                <Tooltip title={ArrowUpTitle} asChild>
                    <button
                        className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-md text-gray-500 transition-colors duration-300 hover:text-black disabled:opacity-50',
                            {
                                'cursor-not-allowed': index === 0,
                            }
                        )}
                        type="button"
                        aria-label={ArrowUpTitle}
                        disabled={index === 0}
                        onClick={() => onClickUp(index)}
                    >
                        <ArrowUp size={16} strokeWidth={1.25} />
                    </button>
                </Tooltip>
                <Tooltip title={ArrowDownTitle} asChild>
                    <button
                        className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-md text-gray-500 transition-colors duration-300 hover:text-black disabled:opacity-50',
                            {
                                'cursor-not-allowed': isLast,
                            }
                        )}
                        type="button"
                        aria-label={ArrowDownTitle}
                        disabled={isLast}
                        onClick={() => onClickDown(index)}
                    >
                        <ArrowDown size={16} strokeWidth={1.25} />
                    </button>
                </Tooltip>
            </div>

            <Tooltip title={removeButtonTitle} asChild>
                <Button
                    className="absolute right-2 top-2 text-gray-500 hover:text-black"
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={removeButtonTitle}
                    onClick={() => onClickRemove(index)}
                >
                    <X size={14} />
                </Button>
            </Tooltip>
        </>
    )
}

export default FieldActions
