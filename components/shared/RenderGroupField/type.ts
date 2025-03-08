import { Control, UseFormReturn } from 'react-hook-form'
import { FormType } from '@/components/shared/PostForm/formSchema'

export type PreviewState = {
    displayUrl: string | null
    inputKey: number
}

export type RenderGroupFieldProps = {
    control: Control<FormType, any>
    getValues: UseFormReturn<FormType>['getValues']
}
