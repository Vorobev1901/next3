import { Control } from 'react-hook-form'
import { FormType } from '@/components/shared/PostForm/formSchema'

export type FieldTextareaUIProps = {
    name: `fields.${number}.name.${number}.name` | `fields.${number}.name` | 'introduction'
    control: Control<FormType, any>
    placeholder?: string
    className?: string
    label?: string
}
