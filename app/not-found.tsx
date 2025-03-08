import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="mx-auto container-sm mt-10">
            <h1 className="text-4xl font-bold">Страница еще в разработке– 404!</h1>

            <div>
                <Link className="text-primary" href="/">Вернуться на голавную</Link>
            </div>
        </div>
    )
}
