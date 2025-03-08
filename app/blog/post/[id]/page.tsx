import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { TPost } from '@/components/shared/PostList/PostList'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ContentField from '@/components/shared/ContentField'
import { DynamicIcon } from 'lucide-react/dynamic'
import Image from 'next/image'

type Props = {
    params: {
        id: string
    }
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
    return {
        title: id,
    }
}

async function getPost(id: string) {
    const response = await fetch(`https://9b586fae0da52313.mokky.dev/posts/${id}`)

    return response.json()
}

const Page = async ({ params: { id } }: Props) => {
    const post: TPost = await getPost(id)
    const { title, fields, tags, time, username, mainImage, introduction } = post

    return (
        <section className="container mx-auto" aria-labelledby="post-title">
            <div className="lg:container-sm mx-auto mb-10 max-w-full">
                <Link className="mb-6 mt-4 flex items-center gap-y-1 text-sm" href="/blog">
                    <ArrowLeft size={14} />
                    Назад к статьям
                </Link>

                <div className="flex flex-col gap-y-8 rounded-lg bg-white p-4">
                    <div className="flex flex-col gap-y-6">
                        <h1 className="text-[27px]/[1.23] font-semibold text-black-900" id="post-title">
                            {title}
                        </h1>

                        <Image className="rounded-md object-cover object-center" src={mainImage.url} alt={title} width={518} height={281} />

                        <div className="text-base/[1.37] text-black-900">
                            <p>{introduction}</p>
                        </div>
                    </div>

                    {!!fields.length && (
                        <div className="flex flex-col gap-y-6">
                            {fields.map(({ name, type }, i) => (
                                <ContentField title={title} key={i} name={name} type={type} />
                            ))}
                        </div>
                    )}

                    <Separator />
                    {!!tags.length && (
                        <div className="flex flex-col gap-y-2">
                            <h4 className="font-bold">Теги</h4>
                            <ul className="flex flex-wrap gap-2">
                                {tags.map(({ name, icon }, i) => (
                                    <li key={i}>
                                        <Badge variant="secondary" className="flex gap-x-1 rounded-sm py-1.5">
                                            <DynamicIcon name={icon} size={16} strokeWidth={1.25} />
                                            <span className="text-[13px] text-black-900">{name}</span>
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="flex items-center gap-x-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage className="bg-gray-200" src="https://github.com/shadcn.png" loading="lazy" sizes="32px" alt="" />
                            <AvatarFallback>МС</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-y-1.5">
                            <span className="text-sm/none font-medium">{username}</span>
                            <span className="text-[10px]/none text-gray-500">{time}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
