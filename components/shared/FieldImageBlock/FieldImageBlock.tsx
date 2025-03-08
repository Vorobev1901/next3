'use client'

import { FieldImageBlockProps } from './type'
import { FieldImageUI } from '@/components/shared'
import { useState } from 'react'

const FieldImageBlock = (props: FieldImageBlockProps) => {
    const { control } = props
    // предпросмотр фото поля 'mainImage'
    const [preview, setPreview] = useState<string>('')
    const [inputKey, setInputKey] = useState<number>(0)

    const onChangeInput = (displayUrl: string) => {
        setPreview(displayUrl)
    }

    const onClickRemoveImage = () => {
        setPreview('')
        setInputKey((prevState) => prevState + 1)
    }

    const name = 'mainImage'

    return (
        <FieldImageUI
            key={inputKey}
            name={name}
            preview={preview}
            control={control}
            onClickRemoveImage={onClickRemoveImage}
            onChangeInput={onChangeInput}
        />
    )
}

export default FieldImageBlock
