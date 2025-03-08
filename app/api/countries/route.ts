import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const countries = await fetch(`http://192.168.103.168/api/v1/catalog/geo/country/`).then((res) => res.json())
        return NextResponse.json(countries)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ data: [] })
    }
}
