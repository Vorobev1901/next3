'use client'
// next
import { FC } from 'react'
import { useRouter } from 'next/navigation'
// utils
import { cn } from '@/lib/utils'
// libraries
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Loader2, Eye } from 'lucide-react'
// components
import { Button, Form } from '@/components/ui'
import {
    RenderGroupField,
    FieldTextUI,
    FieldTextareaUI,
    TagsFieldBlock,
    FieldImageBlock,
    CityFieldBlock,
    CountryFieldBlock,
    CityTriggerProvider,
    FormSubmitButtonsUI,
} from '@/components/shared'
// services
import { addPost, uploadFiles } from '@/services/api'
import useFormStore from '@/store/formStore'
// types
import { FormSchema, FormType } from './formSchema'
import { FormProps } from './type'
import { v4 as uuid } from 'uuid'


const PostForm: FC = (props: FormProps) => {
    const { className } = props
    const router = useRouter()
    const { setFormData, formData, clearFormData } = useFormStore()

    const defaultValues = {
        title: '',
        country: undefined,
        city: undefined,
        tags: [],
        mainImage: undefined,
        introduction: '',
        fields: [],
    }

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: formData || defaultValues,
    })

    const {
        control,
        handleSubmit,
        getValues,
        formState: { isDirty, isValid, isSubmitting, isLoading },
        clearErrors,
        setValue,
        reset
    } = form

    async function onSubmit(post: z.infer<typeof FormSchema>) {
        const fileFields: FileList[] = [post.mainImage]

        post.fields.forEach((field) => {
            if (field.type === 'array') {
                field.name.forEach((item) => {
                    if (item.type === 'file') {
                        fileFields.push(item.name)
                    }
                })
            }
        })
        setFormData(post)
        // Переход на страницу предварительного просмотра с ID в query параметре

        console.log('fileFields', fileFields)
        console.log('Сохранённые данные:', post)
        // uploadFiles(fileFields)
        // uploadFiles(post.mainImage)
        //     .then((res) => {
        //         const newPost = {
        //             ...post,
        //             mainImage: res,
        //         }
        //         console.log(newPost)
        //         addPost(newPost)
        //             .then((_) => {
        //                 router.push('/blog')
        //             })
        //             .catch((error) => {
        //                 console.error(error)
        //             })
        //             .finally(() => {
        //                 setIsLoadingOnSubmit(false)
        //             })
        //     })
        //     .catch((error) => console.log(error))
        clearFormData()
        reset(defaultValues)

        console.log('Данные формы после очистки:', getValues()) // Проверка
    }

    const configTitle = {
        name: 'title' as const,
        label: 'Название статьи',
        placeholder: 'Название статьи...',
    }

    const configIntro = {
        name: 'introduction' as const,
        label: 'Введение',
        placeholder: 'Введение...',
    }

    const handlePreview = () => {
        const tempId = uuid()
        // const formData = getValues()

        console.log(formData)
        setFormData(getValues())
        console.log(getValues())
        router.push(`/blog/preview/${tempId}`)
    }

    const title = 'Добавить новую статью'
    const titleId = 'form-title'
    const preview = 'Предпросмотр'

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn(className, 'mb-10 grid grid-cols-1 gap-x-10 gap-y-2 md:mb-32 lg:grid-cols-[1fr_545px_1fr]')}
                aria-labelledby={titleId}
            >
                <div className="mx-auto mb-2 flex w-full max-w-[545px] items-center justify-between lg:col-start-2">
                    <h1 className="text-xl font-bold md:text-2xl" id={titleId}>
                        {title}
                    </h1>
                    <button type="button" className="hidden text-sm text-blue-600 md:block" onClick={() => handlePreview()}>
                        <span className="hidden md:inline">{preview}</span>
                        <Eye className="block text-blue-600 md:hidden" size={26} strokeWidth={1.25} />
                    </button>
                </div>
                <div className="mx-auto flex w-full max-w-[545px] flex-col gap-y-2 lg:col-start-2">
                    <fieldset className="flex flex-col gap-y-6 rounded-lg bg-white px-4 pb-3 pt-4">
                        {/* Title */}
                        <FieldTextUI
                            control={control}
                            name={configTitle.name}
                            label={configTitle.label}
                            placeholder={configTitle.placeholder}
                        />
                        {/* Context for getting triggered and getting cities */}
                        <div className="grid grid-cols-1 gap-x-2 gap-y-6 md:grid-cols-2">
                            <CityTriggerProvider>
                                <CountryFieldBlock control={control} getValues={getValues} setValue={setValue} clearErrors={clearErrors} />
                                <CityFieldBlock control={control} getValues={getValues} setValue={setValue} clearErrors={clearErrors} />
                            </CityTriggerProvider>
                        </div>
                        {/* Tags */}
                        <TagsFieldBlock control={control} />
                        {/* mainImage */}
                        <FieldImageBlock control={control} />

                        {/* introduction */}
                        <FieldTextareaUI
                            control={control}
                            name={configIntro.name}
                            label={configIntro.label}
                            placeholder={configIntro.placeholder}
                        />
                    </fieldset>

                    {/* Render dynamic fields */}
                    <RenderGroupField getValues={getValues} control={control} />
                </div>

                {/* Submit buttons */}
                <FormSubmitButtonsUI isValid={isValid} isDirty={isDirty} isLoading={isSubmitting} />
            </form>
        </Form>
    )
}
export default PostForm
