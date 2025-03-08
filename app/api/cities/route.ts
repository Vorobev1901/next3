import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('countryId')
    const query = searchParams.get('query')

    try {
        const cities = await fetch(`http://192.168.103.168/api/v1/catalog/geo/city/?countryId=${id}&query=${query}`).then((res) =>
            res.json()
        )
        return NextResponse.json(cities)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ data: [] })
    }
}
