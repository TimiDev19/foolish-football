"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const data = [
  { week: 1, accuracy: 45 },
  { week: 2, accuracy: 27 },
  { week: 3, accuracy: 82 },
  { week: 4, accuracy: 10 },
  { week: 5, accuracy: 64 },
  { week: 6, accuracy: 29 },
  { week: 7, accuracy: 34 },
  { week: 8, accuracy: 66 },
  { week: 9, accuracy: 20 },
  { week: 10, accuracy: 56 },
  { week: 11, accuracy: 47 },
  { week: 12, accuracy: 89.8 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1C1C1C] border border-[#E4E7EC] dark:border-[#282828] rounded-lg px-4 py-2 shadow-md">
        <p className="text-sm font-medium">Week {label}</p>
        <p className="text-sm text-[#2FC337]">
          Accuracy : {payload[0].value}%
        </p>
      </div>
    )
  }

  return null
}

const WeeklyAccuracyChart = () => {
  return (
    <div className="w-full h-[80%]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#E4E7EC"
          />
          <XAxis
            dataKey="week"
            tick={{ fill: "#98A2B3", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#98A2B3", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="linear"
            dataKey="accuracy"
            stroke="#2FC337"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyAccuracyChart