import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'

const PostForm = dynamic(() => import('@/components/shared/PostForm'), { ssr: false })


const Page = () => {
    const linkTitle = 'Назад к статьям'
    const linkHref = '/blog'

    return (
        <section className="container mx-auto">
            <div className="lg:container-sm mx-auto w-full max-w-[545px]">
                <Link className="mb-6 mt-4 flex items-center gap-y-1 text-sm md:mb-10" href={linkHref}>
                    <ArrowLeft size={14} />
                    {linkTitle}
                </Link>
            </div>
            <PostForm />
        </section>
    )
}

export default Page
