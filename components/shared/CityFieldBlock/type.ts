import { Control, UseFormReturn } from 'react-hook-form'
import { FormType } from '@/components/shared/PostForm/formSchema'

export type Props = {
    control: Control<FormType, any>
    setValue: UseFormReturn<FormType>['setValue']
    getValues: UseFormReturn<FormType>['getValues']
    clearErrors: UseFormReturn<FormType>['clearErrors']
}
