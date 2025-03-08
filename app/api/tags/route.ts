import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const tags = await fetch(`http://192.168.103.168/api/v1/catalog/tag/`).then((res) => res.json())
        return NextResponse.json(tags)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ data: [] })
    }
}
