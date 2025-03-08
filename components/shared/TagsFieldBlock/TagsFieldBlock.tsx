'use client'

import { MultiSelect } from '@/components/ui/extension/MultiSelect'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import { MultiSelectorOption } from '@/components/shared/PostForm/type'
import { TagsFieldBlockProps } from './type'
import { getAllTags } from '@/services/api'
import useSWR from 'swr'

function TagsFieldBlock(props: TagsFieldBlockProps) {
    const { control } = props

    // Getting tags
    const {
        data,
        isLoading,
    }: {
        data: { data: MultiSelectorOption[] }
        isLoading: boolean
    } = useSWR('/api/tags', getAllTags, { fallbackData: { data: [] } })

    const config = {
        name: 'tags' as const,
        title: 'Теги',
        label: 'Выберите тег',
        placeholder: 'Поиск тега...',
        maxCount: 3,
    }

    const options = data?.data || []

    return (
        <FormField
            control={control}
            name={config.name}
            render={({ field }) => (
                <FormItem>
                    <p className="text-sm text-gray-500">{config.title}</p>
                    <MultiSelect
                        options={options}
                        isLoading={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        maxCount={config.maxCount}
                        label={config.label}
                        placeholder={config.placeholder}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default TagsFieldBlock
