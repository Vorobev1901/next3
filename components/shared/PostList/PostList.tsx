'use client'

import useSWR from 'swr'
import { getAllPosts } from '@/services/api'
import { PostCard, Preloader, EmptyPostList } from '@/components/shared'
import { IconName } from 'lucide-react/dynamic'

export type TImage = {
    id: number
    url: string
    format: string
    bytes: number
    fileName: string
    height: number
    width: number
}

export type TPost = {
    id: number
    username: string
    time: string
    mainImage: TImage
    introduction: string
    city: {
        name: string
        value: string
    }
    country: {
        name: string
        value: string
    }
    title: string
    fields: {
        name: string
        type: 'text' | 'textarea' | 'file'
    }[]
    tags: {
        name: string
        icon: IconName
    }[]
}

type Props = {
    className?: string
}

const PostList = (props: Props) => {
    const { className } = props

    const { data: posts, isLoading }: { data: TPost[]; isLoading: boolean } = useSWR('posts', getAllPosts)

    return isLoading ? (
        <Preloader />
    ) : !!posts.length ? (
        <ul className={className}>
            {posts.map((post) => (
                <PostCard post={post} key={post.id} />
            ))}
        </ul>
    ) : (
        <EmptyPostList className="mt-5 flex flex-1 flex-col items-center justify-center" />
    )
}

export default PostList
