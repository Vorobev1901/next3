import { Control } from 'react-hook-form'
import { FormType } from '@/components/shared/PostForm/formSchema'

export type FieldImageUIProps = {
    name: `fields.${number}.name.${number}.name` | `fields.${number}.name` | 'mainImage'
    control: Control<FormType, any>
    preview: string | null
    onClickRemoveImage: (index?: number) => void
    onChangeInput: (displayUrl: string, index?: number) => void
    index?: number
}