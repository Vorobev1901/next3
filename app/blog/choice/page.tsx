import { ArrowLeft, BookOpenText, Drama } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Page = () => {
    const choices = [
        {
            title: 'Опубликуйте свою подборку достопримечательностей',
            description:
                'Выбор достопримечательностей — это ваша персональная программа, которую вы можете использовать, чтобы сопровождать туристов в вашем городе.',
            icon: (
                <Drama
                    className="self-center text-gray-400"
                    size={100}
                    strokeWidth={1}
                />
            ),
            button: 'Создать подборку',
            href: '/blog/create',
        },
        {
            title: 'Опубликовать\nстатью',
            description:
                'Статья – интересный и познавательный текст, которым хочется поделиться со своими туристами; текст должен быть привязан к конкретному городу.',
            icon: (
                <BookOpenText
                    className="self-center text-gray-400"
                    size={100}
                    strokeWidth={1}
                />
            ),
            button: 'Создать статью',
            href: '/blog/create',
        },
    ]

    return (
        <section
            className="container-sm mx-auto mb-0 flex flex-1 flex-col md:mb-10"
            aria-labelledby="articles-choice"
        >
            <h1 className="sr-only" id="articles-choice">
                Выбор: создать статью или подборку
            </h1>
            <Link
                className="mb-8 mt-4 flex items-center gap-y-1 text-sm md:mb-0"
                href="/blog"
            >
                <ArrowLeft size={14} />
                Назад к статьям
            </Link>
            <div className="mb-12 grid grid-cols-1 gap-x-8 gap-y-7 md:my-auto md:grid-cols-2">
                {choices.map((choice, i) => (
                    <div
                        className="flex h-full flex-col gap-y-3"
                        key={choice.title}
                    >
                        {choice.icon}
                        <div className="mb-5 flex flex-col gap-y-2 md:mb-10">
                            <h2 className="whitespace-pre-wrap text-center text-lg/[1.29] font-semibold">
                                {choice.title}
                            </h2>
                            <div className="text-center text-sm/[1.38]">
                                <p>{choice.description}</p>
                            </div>
                        </div>
                        <Button
                            className="mt-auto font-semibold sm:text-lg"
                            variant="default"
                            asChild
                        >
                            <Link href={choice.href}>{choice.button}</Link>
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Page
