'use client'

import { useState } from 'react'
import FieldActions from '@/components/shared/FieldActions'
import { useFieldArray } from 'react-hook-form'
import ContentMenu from '@/components/shared/ContentMenu'
import { FieldTextUI, FieldTextareaUI, FieldImageUI } from '@/components/shared'
import { PreviewState, RenderGroupFieldProps } from './type'

const RenderGroupField = (props: RenderGroupFieldProps) => {
    const { control, getValues } = props

    const {
        fields,
        append,
        remove: removeField,
        swap: swapFields,
    } = useFieldArray({
        name: 'fields',
        control: control,
    })

    const [previewState, setPreviewState] = useState<PreviewState[]>([])

    const lastIndex = fields.length

    const pushPreviewState = () => {
        const newState = [...previewState]
        newState[lastIndex] = { displayUrl: '', inputKey: 0 }
        setPreviewState(newState)
    }

    const onChangeInput = (displayUrl: string, index?: number) => {
        if (index !== undefined) {
            const newState = [...previewState]
            newState[index].displayUrl = displayUrl
            setPreviewState(newState)
        }
    }

    const onClickRemoveImage = (index?: number) => {
        if (index !== undefined) {
            const newState = [...previewState]
            newState[index].displayUrl = ''
            newState[index].inputKey = newState[index].inputKey + 1
            setPreviewState(newState)
        }
    }

    const onClickUp = (index: number) => {
        swapFields(index, index - 1)
        const newState = [...previewState]
        const temp = newState[index - 1]
        newState[index - 1] = newState[index]
        newState[index] = temp
        setPreviewState(newState)
    }

    const onClickDown = (index: number) => {
        swapFields(index, index + 1)
        const newState = [...previewState]
        const temp = newState[index + 1]
        newState[index + 1] = newState[index]
        newState[index] = temp
        setPreviewState(newState)
    }

    const onClickRemoveField = (fieldIndex: number) => {
        removeField(fieldIndex)
        const newState = [...previewState].filter((_, index) => fieldIndex !== index)
        setPreviewState(newState)
    }

    const length = fields.length

    const labelText = 'Описание фото'
    const placeholderText = 'Описание фото...'

    return (
        <>
            {fields.map(({ id }, index) => {
                {
                    const type = getValues(`fields.${index}.type`)
                    if (type === 'text') {
                        const name = `fields.${index}.name` as const
                        return (
                            <fieldset className="relative flex select-none rounded-lg bg-white p-4" key={id}>
                                <FieldTextUI name={name} control={control} />
                                <FieldActions
                                    index={index}
                                    length={length}
                                    onClickUp={onClickUp}
                                    onClickDown={onClickDown}
                                    onClickRemove={onClickRemoveField}
                                />
                            </fieldset>
                        )
                    } else if (type === 'textarea') {
                        const name = `fields.${index}.name` as const
                        return (
                            <fieldset className="relative flex select-none rounded-lg bg-white p-4" key={id}>
                                <FieldTextareaUI name={name} control={control} />
                                <FieldActions
                                    index={index}
                                    length={length}
                                    onClickUp={onClickUp}
                                    onClickDown={onClickDown}
                                    onClickRemove={onClickRemoveField}
                                />
                            </fieldset>
                        )
                    } else if (type === 'array') {
                        const inputKey = previewState[index]?.inputKey
                        const nameImage = `fields.${index}.name.${0}.name` as const
                        const nameText = `fields.${index}.name.${1}.name` as const
                        return (
                            <fieldset className="relative flex select-none flex-col gap-y-4 rounded-lg bg-white p-4" key={id}>
                                <FieldImageUI
                                    key={inputKey}
                                    name={nameImage}
                                    control={control}
                                    preview={previewState[index].displayUrl}
                                    onClickRemoveImage={onClickRemoveImage}
                                    onChangeInput={onChangeInput}
                                    index={index}
                                />
                                <FieldTextUI name={nameText} control={control} placeholder={labelText} label={placeholderText} />

                                <FieldActions
                                    index={index}
                                    length={length}
                                    onClickUp={onClickUp}
                                    onClickDown={onClickDown}
                                    onClickRemove={onClickRemoveField}
                                />
                            </fieldset>
                        )
                    }
                }
            })}
            <ContentMenu append={append} pushPreviewState={pushPreviewState} />
        </>
    )
}

export default RenderGroupField
