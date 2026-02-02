// app/api/analysis/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    // Read season and week from query params
    const url = new URL(req.url)
    const season = url.searchParams.get('season') ?? '2025'
    const week = url.searchParams.get('week') ?? '8'

    // Server-side fetch to external API (CORS not an issue)
    const res = await fetch(`http://185.193.17.89:7000/api/analysis?season=${season}&week=${week}`)

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch external API' }, { status: res.status })
    }

    const data = await res.json()

    // Return JSON to client
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
