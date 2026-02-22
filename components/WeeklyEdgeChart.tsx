// "use client"

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"

// type Game = {
//   id: string
//   total: number
//   edge: number
//   spread: number
//   visitor_team: {
//     abbreviation: string
//   }
//   home_team: {
//     abbreviation: string
//   }
// }

// export default function WeeklyEdgeBarChart({ games }: { games: Game[] }) {
//   const data = games.map((game) => ({
//     name: `${game.visitor_team.abbreviation} vs ${game.home_team.abbreviation}`,
//     total: game.spread,
//   }))

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={data}>
//         <XAxis
//           dataKey="name"
//           tick={{ fontSize: 12 }}
//           interval={0}
//           angle={-25}
//           textAnchor="end"
//           height={80}
//         />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="total" radius={[10, 10, 0, 0]} fill="#2FC337"
//           activeBar={{ fill: "#22A861" }} />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }

"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

type Game = {
  id: string
  total: number
  edge: number
  spread: number
  visitor_team: {
    abbreviation: string
  }
  home_team: {
    abbreviation: string
  }
}

export default function WeeklyEdgeLineChart({ games }: { games: Game[] }) {

  const data = games.map((game) => ({
    name: `${game.visitor_team.abbreviation} vs ${game.home_team.abbreviation}`,
    spread: Number(game.spread) || 0,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        
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

        <Line
          type="monotone"
          dataKey="spread"
          stroke="#2FC337"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}