// "use client";

// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { stat: "Offense", Home: 16, Visitors: 14 },
//   { stat: "Clutch", Home: 14, Visitors: 22 },
//   { stat: "Defense", Home: 15, Visitors: 18 },
//   { stat: "Rebounding", Home: 18, Visitors: 17 },
//   { stat: "Efficiency", Home: 20, Visitors: 17 },
// ];

// export default function TeamRadarChart() {
//   return (
//     <div className="w-full h-[420px] bg-white rounded-xl p-4">
//       <ResponsiveContainer width="100%" height="100%">
//         <RadarChart data={data}>
//           <PolarGrid />
//           <PolarAngleAxis dataKey="stat" />
//           <PolarRadiusAxis angle={90} domain={[0, 35]} />

//           <Radar
//             name="Home : 112"
//             dataKey="Home"
//             stroke="#22c55e"
//             fill="#22c55e"
//             fillOpacity={0.35}
//           />

//           <Radar
//             name="Visitors : 86"
//             dataKey="Visitors"
//             stroke="#3b82f6"
//             fill="#3b82f6"
//             fillOpacity={0.35}
//           />

//           <Legend />
//         </RadarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { stat: "Offense", Home: 16, Visitors: 14 },
  { stat: "Clutch", Home: 14, Visitors: 22 },
  { stat: "Defense", Home: 15, Visitors: 18 },
  { stat: "Rebounding", Home: 18, Visitors: 17 },
  { stat: "Efficiency", Home: 20, Visitors: 17 },
];

export default function TeamRadarChart() {
  return (
    <div className="relative w-full max-w-xl rounded-2xl bg-white p-6">
      {/* Header */}
      {/* <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Team Comparison
          </h3>
          <p className="text-xs text-slate-500">
            Performance breakdown
          </p>
        </div>
      </div> */}

      {/* Chart */}
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#e5e7eb" />

            <PolarAngleAxis
              dataKey="stat"
              tick={{
                fill: "#475569",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <PolarRadiusAxis
              domain={[0, 35]}
              tick={false}
              axisLine={false}
            />

            <Radar
              name="Home · 112"
              dataKey="Home"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.25}
              dot={{ r: 3 }}
            />

            <Radar
              name="Visitors · 86"
              dataKey="Visitors"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.25}
              dot={{ r: 3 }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
                color: "#334155",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
