import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'

const FullPost = dynamic(() => import('@/components/shared/FullPost'), { ssr: false, loading: () => <p>Загрузка...</p> })

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params
    if (!id) {
        notFound()
    }

    return {
        title: `Предпросмотр поста`,
    }
}

const PreviewPage = ({ params }: { params: { id: string } }) => {
    const { id } = params

    return (
        <section className="container mx-auto mb-10">
            <div className="lg:container-sm mx-auto w-full max-w-[545px]">
                <Link className="mb-6 mt-4 flex items-center gap-y-1 text-sm md:mb-10" href="/blog/create">
                    <ArrowLeft size={14} />
                    Назад к форме
                </Link>
                <FullPost id={id} />
            </div>
        </section>
    )
}

export default PreviewPage
