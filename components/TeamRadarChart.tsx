// // "use client";

// // import {
// //   Radar,
// //   RadarChart,
// //   PolarGrid,
// //   PolarAngleAxis,
// //   PolarRadiusAxis,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";

// // const data = [
// //   { stat: "Offense", Home: 16, Visitors: 14 },
// //   { stat: "Clutch", Home: 14, Visitors: 22 },
// //   { stat: "Defense", Home: 15, Visitors: 18 },
// //   { stat: "Rebounding", Home: 18, Visitors: 17 },
// //   { stat: "Efficiency", Home: 20, Visitors: 17 },
// // ];

// // export default function TeamRadarChart() {
// //   return (
// //     <div className="w-full h-[420px] bg-white rounded-xl p-4">
// //       <ResponsiveContainer width="100%" height="100%">
// //         <RadarChart data={data}>
// //           <PolarGrid />
// //           <PolarAngleAxis dataKey="stat" />
// //           <PolarRadiusAxis angle={90} domain={[0, 35]} />

// //           <Radar
// //             name="Home : 112"
// //             dataKey="Home"
// //             stroke="#22c55e"
// //             fill="#22c55e"
// //             fillOpacity={0.35}
// //           />

// //           <Radar
// //             name="Visitors : 86"
// //             dataKey="Visitors"
// //             stroke="#3b82f6"
// //             fill="#3b82f6"
// //             fillOpacity={0.35}
// //           />

// //           <Legend />
// //         </RadarChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // }

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
//     <div className="relative w-full max-w-xl rounded-2xl bg-white p-6">
//       {/* Header */}
//       {/* <div className="mb-4 flex items-center justify-between">
//         <div>
//           <h3 className="text-sm font-semibold text-slate-900">
//             Team Comparison
//           </h3>
//           <p className="text-xs text-slate-500">
//             Performance breakdown
//           </p>
//         </div>
//       </div> */}

//       {/* Chart */}
//       <div className="h-[360px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <RadarChart data={data}>
//             <PolarGrid stroke="#e5e7eb" />

//             <PolarAngleAxis
//               dataKey="stat"
//               tick={{
//                 fill: "#475569",
//                 fontSize: 12,
//                 fontWeight: 500,
//               }}
//             />

//             <PolarRadiusAxis
//               domain={[0, 35]}
//               tick={false}
//               axisLine={false}
//             />

//             <Radar
//               name="Home · 112"
//               dataKey="Home"
//               stroke="#22c55e"
//               fill="#22c55e"
//               fillOpacity={0.25}
//               dot={{ r: 3 }}
//             />

//             <Radar
//               name="Visitors · 86"
//               dataKey="Visitors"
//               stroke="#3b82f6"
//               fill="#3b82f6"
//               fillOpacity={0.25}
//               dot={{ r: 3 }}
//             />

//             <Legend
//               verticalAlign="top"
//               align="right"
//               iconType="circle"
//               wrapperStyle={{
//                 fontSize: "12px",
//                 color: "#334155",
//               }}
//             />
//           </RadarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }











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

// interface TeamRadarChartProps {
//   data: { stat: string; Home: number; Visitors: number }[];
// }

// export default function TeamRadarChart({ data }: TeamRadarChartProps) {
//   if (!data || data.length === 0) return null;

//   return (
//     <div className="relative w-full max-w-xl rounded-2xl bg-white p-6">
//       <div className="h-[360px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <RadarChart data={data}>
//             <PolarGrid stroke="#e5e7eb" />
//             <PolarAngleAxis
//               dataKey="stat"
//               tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }}
//             />
//             <PolarRadiusAxis domain={[0, Math.max(...data.flatMap(d => [d.Home, d.Visitors]))]} tick={false} axisLine={false} />
//             <Radar
//               name={`${homeAbbr} · ${data.reduce((acc, d) => acc + d.Home, 0)}`}
//               dataKey="Home"
//               stroke="#22c55e"
//               fill="#22c55e"
//               fillOpacity={0.25}
//               dot={{ r: 3 }}
//             />
//             <Radar
//               name={`Visitors · ${data.reduce((acc, d) => acc + d.Visitors, 0)}`}
//               dataKey="Visitors"
//               stroke="#3b82f6"
//               fill="#3b82f6"
//               fillOpacity={0.25}
//               dot={{ r: 3 }}
//             />
//             <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: "12px", color: "#334155" }} />
//           </RadarChart>
//         </ResponsiveContainer>
//       </div>
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

type Metric = {
  category: string;
  [key: string]: string | number; // dynamic keys for team abbreviations
};

type TeamRadarChartProps = {
  metrics: Metric[];
  homeAbbr: string;
  visitorAbbr: string;
  homeScore?: string | number;
  visitorScore?: string | number;
};

export default function TeamRadarChart({
  metrics,
  homeAbbr,
  visitorAbbr,
  homeScore,
  visitorScore,
}: TeamRadarChartProps) {
  // Transform metrics to Recharts format
  const radarData = metrics.map((metric) => ({
    stat: metric.category,
    [homeAbbr]: Number(metric[homeAbbr] ?? 0),
    [visitorAbbr]: Number(metric[visitorAbbr] ?? 0),
  }));

  return (
    <div className="relative w-full max-w-xl rounded-2xl bg-white p-6">
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />

            <PolarAngleAxis
              dataKey="stat"
              tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }}
            />

            <PolarRadiusAxis domain={[0, 35]} tick={false} axisLine={false} />

            <Radar
              name={`${homeAbbr}`}
              dataKey={homeAbbr}
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.25}
              dot={{ r: 3 }}
            />

            <Radar
              name={`${visitorAbbr}`}
              dataKey={visitorAbbr}
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.25}
              dot={{ r: 3 }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", color: "#334155" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}