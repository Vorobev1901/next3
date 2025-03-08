'use client'

import useStore from '@/store/formStore'
import Image from 'next/image'
import ContentField from '@/components/shared/ContentField'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { DynamicIcon } from 'lucide-react/dynamic'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { getImageData } from '@/utils/functions'

type Props = {
    id: string
}

const FullPost = (props: Props) => {
    const { formData } = useStore()

    const dataTransfer = new DataTransfer()
    const mainImageUrl = formData?.mainImage && formData.mainImage[0]?.name
    //
    // if (.item === 0) {
    //     return null
    // }
    //
    // Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image as File))
    //
    // const files = dataTransfer.files
    // const displayUrl = URL.createObjectURL(event.target.files![0])
    //
    // return { files, displayUrl }

    return (
        <div className="flex flex-col gap-y-8 rounded-lg bg-white p-4">
            <div className="flex flex-col gap-y-6">
                <h1 className="text-[27px]/[1.23] font-semibold text-black-900" id="post-title">
                    {formData?.title}
                </h1>

                <Image
                    className="rounded-md bg-gray-80 object-cover object-center"
                    src={`/${mainImageUrl}` || ''}
                    alt={formData?.title || ''}
                    width={518}
                    height={281}
                />

                <div className="text-base/[1.37] text-black-900">
                    <p>{formData?.introduction}</p>
                </div>
            </div>

            {/*{!!formData?.fields.length && (*/}
            {/*    <div className="flex flex-col gap-y-6">*/}
            {/*        {formData?.fields.map(({ name, type }, i) => <ContentField title={formData?.title} key={i} name={name} type={type} />)}*/}
            {/*    </div>*/}
            {/*)}*/}

            <Separator />
            {!!formData?.tags.length && (
                <div className="flex flex-col gap-y-2">
                    <h4 className="font-bold">Теги</h4>
                    <ul className="flex flex-wrap gap-2">
                        {formData?.tags.map((name, i) => (
                            <li key={i}>
                                <Badge variant="secondary" className="flex gap-x-1 rounded-sm py-1.5">
                                    {/*<DynamicIcon name={icon} size={16} strokeWidth={1.25} />*/}
                                    <span className="text-[13px] text-black-900">{name}</span>
                                </Badge>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>{formData?.country?.intName}</div>
            <div>{formData?.city?.intName}</div>

            <div className="flex items-center gap-x-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage className="bg-gray-200" src="https://github.com/shadcn.png" loading="lazy" sizes="32px" alt="" />
                    <AvatarFallback>МС</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-y-1.5">
                    <span className="text-sm/none font-medium">Nikita</span>
                    <span className="text-[10px]/none text-gray-500">12.31.2312</span>
                </div>
            </div>
        </div>
    )
}

export default FullPost
