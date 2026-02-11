"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Game = {
  id: string
  total: number
  visitor_team: {
    abbreviation: string
  }
  home_team: {
    abbreviation: string
  }
}

export default function WeeklyTotalsBarChart({ games }: { games: Game[] }) {
  const data = games.map((game) => ({
    name: `${game.visitor_team.abbreviation} vs ${game.home_team.abbreviation}`,
    total: game.total,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          interval={0}
          angle={-25}
          textAnchor="end"
          height={80}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" radius={[10, 10, 0, 0]} fill="#2FC337"
          activeBar={{ fill: "#22A861" }} />
      </BarChart>
    </ResponsiveContainer>
  )
}