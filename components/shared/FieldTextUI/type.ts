import { Control } from 'react-hook-form'
import { FormType } from '@/components/shared/PostForm/formSchema'

export type FieldTextUIProps = {
    control: Control<FormType, any>
    name: `fields.${number}.name.${number}.name` | `fields.${number}.name` | 'title'
    placeholder?: string
    label?: string
}