import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const posts = await fetch(`https://9b586fae0da52313.mokky.dev/posts`).then((res) => res.json())
        return NextResponse.json(posts)
    } catch (error) {
        console.error(error)
        return NextResponse.json([])
    }
}
