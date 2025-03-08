import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PostMenu from '../PostMenu'
import Image from 'next/image'
import Link from 'next/link'
import { TPost } from '@/components/shared/PostList/PostList '

type Props = {
    post: TPost
}

const PostCard = (props: Props) => {
    const { post } = props
    const { id, username, title, fields, time, introduction, mainImage } = post

    return (
        <li>
            <article className="flex flex-col gap-y-4 rounded-lg bg-white p-4">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                className="bg-gray-200"
                                src="https://github.com/shadcn.png"
                                loading="lazy"
                                sizes="32px"
                                alt=""
                            />
                            <AvatarFallback>МС</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-y-1.5">
                            <span className="text-sm/none font-medium">
                                {username}
                            </span>
                            <span className="text-[10px]/none text-gray-500">
                                {time}
                            </span>
                        </div>
                    </div>

                    <PostMenu id={id} />
                </header>
                <div className="flex flex-col gap-y-2">
                    <Image
                        className="object-center object-cover rounded-md"
                        src={mainImage.url}
                        alt={title}
                        width={518}
                        height={281}
                    />

                    <h3 className="text-lg/[1.29] font-semibold">{title}</h3>

                    <div className="text-sm/[1.38] text-gray-500">
                        <p className="line-clamp-3">{introduction}</p>
                    </div>
                </div>

                <footer>
                    <Link href={`/blog/post/${id}`} className="py-1 text-blue-600">
                        Читать далее
                    </Link>
                </footer>
            </article>
        </li>
    )
}

export default PostCard
