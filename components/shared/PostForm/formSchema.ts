import { z } from 'zod'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/constants'

const FileSchema = z
    .unknown()
    .transform((value) => {
        return value as FileList
    })
    .refine((file) => file?.length == 1, 'Пожалуйста, выберите картинку.')
    .refine((files) => {
        return files?.[0]?.size <= MAX_FILE_SIZE
    }, `Максимальный размер 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), 'Поддерживаются только форматы .jpg, .jpeg, .png and .webp.')

const TextFieldSchema = z.object({
    name: z.union([z.string(), z.any()]).refine(
        (value) => {
            return typeof value === 'string' ? value.length >= 2 : true
        },
        {
            message: 'Пожалуйста, заполните поле',
        }
    ),
    type: z.enum(['text', 'textarea'], {
        message: 'Пожалуйста, заполните поле',
    }),
})

const FileFieldSchema = z.object({
    name: FileSchema,
    type: z.literal('file', {
        message: 'Пожалуйста, заполните поле',
    }),
})

const TextOrFileFieldSchema = z.object({
    name: z.array(z.union([TextFieldSchema, FileFieldSchema])),
    type: z.literal('array', {
        message: 'Пожалуйста, заполните поле',
    }),
    id: z.string(),
})

const FieldSchema = z.array(z.union([TextFieldSchema, TextOrFileFieldSchema]))

const GeoSchema = z
    .object({
        id: z.string(),
        name: z.string(),
        intName: z.string(),
    })
    .optional()
    .refine(
        (value) => {
            return value ? value.intName !== undefined : false
        },
        { message: 'Пожалуйста, заполните поле.' }
    )

export const FormSchema = z.object({
    title: z.string().min(2, 'Пожалуйста, заполните название.').max(50, 'Не должно превышать 50 символов'),
    introduction: z.string().min(2, 'Пожалуйста, заполните описание.').max(150, 'Не должно превышать 150 символов'),
    tags: z.array(z.string()).nonempty('Пожалуйста, выберите теги.'),
    country: GeoSchema,
    city: GeoSchema,
    mainImage: FileSchema,
    fields: FieldSchema,
})

export type FormType = z.infer<typeof FormSchema>
