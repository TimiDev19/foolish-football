"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import WeeklyAccuracyChart from "@/components/WeeklyAccuracyChart";
import { Alert01Icon, Alert02Icon, ChartBreakoutSquareIcon, Upload01Icon, UserWarning01Icon } from 'hugeicons-react';
import { getDashboardMetrics } from '@/lib/dashboard'
import { useRouter } from 'next/navigation';
import WeeklyTotalsBarChart from '@/components/WeeklyTotalChart';
import Link from 'next/link';
import WeeklyEdgeBarChart from '@/components/WeeklyEdgeChart';
type DashboardMetrics = {
  accuracy: { score: string; trend: string }
  top_edge: { value: string; matchup: string }
  summary: { games_analysed: number; analysed_trend: string }
}

const page = () => {
  const router = useRouter()
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dashboardError, setDashboardError] = useState(false)
  const [dynamicWeek, setDynamicWeek] = useState("8")
  const [isPDFLoading, setIsPDFLoading] = useState(false)

  const season = 2025
  const week = 8

  // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) router.push("/login")
  }, [router])

  // ✅ Fetch metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        if (!token) return router.push("/login")

        const res = await fetch(`http://api.foolishfootball.site/api/analysis?season=2025&week=${dynamicWeek}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error(`Failed to fetch metrics: ${res.status}`)
        const data = await res.json()
        setMetrics(data)
      } catch (err) {
        console.error("Error fetching metrics:", err)
        setDashboardError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [season, dynamicWeek, router])



  useEffect(() => {
    // Fetch featured games for the selected week
    const fetchGames = async () => {
      setLoading(true);          // Start loading
      setDashboardError(false);  // Reset error state

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if no token
          router.push("/login");
          return;
        }

        const res = await fetch(
          `http://api.foolishfootball.site/api/games/featured?season=${season}&week=${dynamicWeek}&page=1&limit=20&search=`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error fetching games: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setGames(data.games || []);
      } catch (err) {
        console.error("Failed to fetch games", err);
        setDashboardError(true);
        setGames([]); // Clear games on error
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchGames();
  }, [dynamicWeek, season, router]);

  // ✅ Export PDF
  const handleExportPDF = async () => {
    setIsPDFLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in.");
        return;
      }

      const res = await fetch(
        `http://api.foolishfootball.site/api/predictions/export-pdf?season=${season}&week=${dynamicWeek}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to generate PDF: ${res.status}`);
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `predictions-week-${week}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("PDF Export Error:", err);
      alert("Failed to export PDF");
    } finally {
      setIsPDFLoading(false);
    }
  };

  const getLogo = (abbr: string) =>
    `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr.toLowerCase()}.png`

  const formatTime = (date: string) =>
    new Date(date).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })

  if (loading) {
    return (
      <div className=" h-[100vh] w-[100vw] pl-[15vw]">
        <div className=" h-[64px] w-full bg-white dark:bg-[#1C1C1C] border-b border-[#E4E7EC] dark:border-[#282828] px-[4%] flex items-center justify-between mb-[20px]">
          <select onChange={(e) => setDynamicWeek(e.target.value)} name="" id="" className=" h-[40px] min-w-[117px] bg-[#F9FAFB] dark:bg-[#232323] dark:border dark:border-[#282828] text-[#555555] dark:text-white rounded-lg">
            <option value="8">Week 8</option>
            <option value="9">Week 9</option>
          </select>

          <div className=" flex items-center justify-between w-[105px] h-[36px] text-[#475367] dark:text-white px-[1%] bg-[#FFFFFF] dark:bg-[#232323] border border-[#E4E7EC] dark:border-[#282828] rounded-lg">
            <div className=" h-[8px] w-[8px] bg-[#2FC337] rounded-full"></div>
            Live Data
          </div>
        </div>

        <div className=" w-full px-[2.5%] text-black dark:text-white">
          <div className=" w-full flex items-center justify-between mb-[20px]">
            <div>
              <h1 className=" text-[24px] font-semibold">Dashboard</h1>
              <p className=" text-[#475367] dark:text-[#979797]">Week {dynamicWeek} Performance Analytics</p>
            </div>

            <button disabled={loading} className=" cursor-pointer ease-in-out duration-500 hover:bg-transparent hover:text-[#2FC337] flex items-center justify-between min-w-[138px] h-[40px] text-white px-[1%] bg-[#2FC337] dark:bg-[#232323] dark:border border-[#282828] rounded-lg">
              {
                isPDFLoading ?
                  (
                    <p>Loading...</p>
                  )
                  :
                  (
                    <div className=' w-full flex items-center justify-between'>
                      <Upload01Icon strokeWidth={1.5} />
                      Export CSV
                    </div>
                  )
              }
            </button>
          </div>

          <div className=" w-full flex items-center justify-between mb-[20px]">
            <div className=" h-[127px] w-[32%] rounded-lg bg-[#CDEBCF] animate-pulse dark:bg-[#1C1C1C]  border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            </div>

            <div className=" h-[127px] w-[32%] rounded-lg bg-[#CDEBCF] animate-pulse dark:bg-[#1C1C1C]  border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            </div>

            <div className=" h-[127px] w-[32%] rounded-lg bg-[#CDEBCF] animate-pulse dark:bg-[#1C1C1C]  border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            </div>
          </div>

          <div className=" w-full mb-[25px]">
            <h1 className=" text-[18px] font-semibold mb-[8px]">Featured Games - Week 8</h1>
            <div className=" w-full h-[45vh] overflow-y-scroll bg-[#CDEBCF] animate-pulse dark:bg-[#1C1C1C] rounded-2xl">
            </div>
          </div>

          <div className=" w-full">
            <h1 className=" text-[18px] font-semibold mb-[8px]">Totals Chart</h1>
            <div className=" w-full h-[65vh] bg-[#CDEBCF] dark:bg-[#232323] animate-pulse rounded-2xl flex items-center justify-center">
            </div>
          </div>

          <div className=" w-full">
            <h1 className=" text-[18px] font-semibold mb-[8px]">Spread Chart</h1>
            <div className=" w-full h-[65vh] bg-[#CDEBCF] dark:bg-[#232323] animate-pulse rounded-2xl flex items-center justify-center">
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (dashboardError) {
    return (
      <div className=" h-[100vh] w-[100vw] pl-[15vw] flex items-center justify-center">
        <div className=' min-h-[272px] min-w-[434px] bg-white rounded-2xl border border-black/10 flex flex-col items-center justify-center'>
          <Alert02Icon className=' text-[#FFC300] mb-[15px]' size={50} strokeWidth={1.5} />
          <h1 className=' text-black text-[18px] font-semibold mb-[10px]'>Error loading dashboard data</h1>
          <p className=' text-[16px] text-[#475367] mb-[20px]'>Failed to fetch game lines and model prediction</p>
          <button onClick={() => window.location.reload()} className=' bg-[#2FC337] text-[16px] font-semibold text-white w-[90%] rounded-sm h-[40px] p-[5px] focus:outline-none cursor-pointer flex items-center justify-center'>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className=" h-[100vh] w-[100vw] pl-[15vw]">
      <div className=" h-[64px] w-full bg-white darke:bg-[#1C1C1C] border-b border-[#E4E7EC] dark:border-[#282828] px-[4%] flex items-center justify-between mb-[20px]">
        <select onChange={(e) => setDynamicWeek(e.target.value)} name="" id="" className=" focus:outline-none h-[40px] min-w-[117px] bg-[#F9FAFB] dark:bg-[#232323] dark:border dark:border-[#282828] text-[#555555] dark:text-white rounded-lg">
          <option value="8">Week 8</option>
          <option value="9">Week 9</option>
        </select>

        <div className=" flex items-center justify-between w-[105px] h-[36px] text-[#475367] dark:text-white px-[1%] bg-[#FFFFFF] dark:bg-[#232323] border border-[#E4E7EC] dark:border-[#282828] rounded-lg">
          <div className=" h-[8px] w-[8px] bg-[#2FC337] rounded-full"></div>
          Live Data
        </div>
      </div>

      <div className=" w-full px-[2.5%] text-black dark:text-white">
        <div className=" w-full flex items-center justify-between mb-[20px]">
          <div>
            <h1 className=" text-[24px] font-semibold">Dashboard</h1>
            <p className=" text-[#475367] dark:text-[#979797]">Week {dynamicWeek} Performance Analytics</p>
          </div>

          <button disabled={loading} onClick={handleExportPDF} className=" cursor-pointer ease-in-out duration-500 hover:bg-transparent hover:text-[#2FC337] flex items-center justify-between min-w-[138px] h-[40px] text-white px-[1%] bg-[#2FC337] dark:bg-[#232323] dark:border border-[#282828] rounded-lg">
            {
              isPDFLoading ?
                (
                  <p>Loading...</p>
                )
                :
                (
                  <div className=' w-full flex items-center justify-between'>
                    <Upload01Icon strokeWidth={1.5} />
                    Export CSV
                  </div>
                )
            }
          </button>
        </div>

        {/* <div className=" w-full flex items-center justify-between mb-[20px]">
          <div className=" h-[127px] w-[32%] rounded-lg bg-white dark:bg-[#1C1C1C] border border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            <div>
              <h1 className=" text-[14px] text-[#475367] dark:text-[#979797]">Games Analyzed</h1>
              <h1 className=" text-[24px] font-semibold">{metrics?.summary.games_analysed}</h1>
              <h1 className=" text-[14px] text-[#0F973D] dark:text-[#979797]">{metrics?.summary.analysed_trend} from last week</h1>
            </div>

            <div className=" text-[#2FC337] dark:text-[#979797] bg-[#CDEBCF] dark:bg-[#232323] h-[52px] w-[52px] flex items-center justify-center rounded-lg">
              <ChartBreakoutSquareIcon />
            </div>
          </div>

          <div className=" h-[127px] w-[32%] rounded-lg bg-white dark:bg-[#1C1C1C] border border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            <div>
              <h1 className=" text-[14px] text-[#475367] dark:text-[#979797]">Top Edge Identified</h1>
              <h1 className=" text-[24px] font-semibold">{metrics?.top_edge.value}</h1>
              <h1 className=" text-[14px] text-[#0F973D] dark:text-[#979797]">{metrics?.top_edge.matchup}</h1>
            </div>

            <div className=" text-[#2FC337] dark:text-[#979797] bg-[#CDEBCF] dark:bg-[#232323] h-[52px] w-[52px] flex items-center justify-center rounded-lg">
              <ChartBreakoutSquareIcon />
            </div>
          </div>

          <div className=" h-[127px] w-[32%] rounded-lg bg-white dark:bg-[#1C1C1C] border border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            <div>
              <h1 className=" text-[14px] text-[#475367] dark:text-[#979797]">Model Accuracy</h1>
              <h1 className=" text-[24px] font-semibold">{metrics?.accuracy.score}</h1>
              <h1 className=" text-[14px] text-[#0F973D] dark:text-[#979797]">{metrics?.accuracy.trend}</h1>
            </div>

            <div className=" text-[#2FC337] dark:text-[#979797] bg-[#CDEBCF] dark:bg-[#232323] h-[52px] w-[52px] flex items-center justify-center rounded-lg">
              <ChartBreakoutSquareIcon />
            </div>
          </div>
        </div> */}

        <div className=" w-full mb-[25px]">
          <h1 className=" text-[18px] font-semibold mb-[8px]">Featured Games - Week {dynamicWeek}</h1>
          <div className=" w-full h-[45vh] overflow-y-scroll bg-[#FFFFFF] dark:bg-[#1C1C1C] rounded-2xl">
            <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-[#475367] dark:text-[#878787]">Matchup</TableHead>
                  <TableHead className=" text-[#475367] dark:text-[#878787]">Spread</TableHead>
                  <TableHead className=" text-[#475367] dark:text-[#878787]">Total</TableHead>
                  <TableHead className=" text-[#475367] dark:text-[#878787]">Win Probability</TableHead>
                  <TableHead className=" text-[#475367] dark:text-[#878787] text-right">Edge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={6}>Loading games...</TableCell>
                  </TableRow>
                )}

                {!loading && games.map(game => (
                  <TableRow
                    key={game.game_id}
                    className="border-b border-b-[#E4E7EC] dark:border-b-[#404040] cursor-pointer"

                    onClick={() => {
                      const params = new URLSearchParams({
                        visitor: game.visitor_team.abbreviation,
                        home: game.home_team.abbreviation,
                        visitor_name: game.visitor_team.full_name,
                        home_name: game.home_team.full_name,
                        visitor_score: game.visitor_team_score?.toString() || "0",
                        home_score: game.home_team_score?.toString() || "0",
                        date: game.date,
                        status: game.status,
                        stadium: game.venue,
                        spread: game.spread,
                        total: game.total,
                        win_probability: game.win_probability
                      }).toString()

                      router.push(`/games/${game.id}?${params}`)
                    }}
                  >
                    {/* MATCHUP */}
                    <TableCell className="font-medium min-w-[35vw] flex items-center">
                      <img
                        src={getLogo(game.home_team.abbreviation)}
                        className="h-[40px] w-[40px] rounded-full mr-3"
                      />
                      <img
                        src={getLogo(game.visitor_team.abbreviation)}
                        className="h-[40px] w-[40px] rounded-full mr-2"
                      />

                      <div>
                        <h1 className="font-semibold text-[14px]">
                          {game.home_team.full_name} vs {game.visitor_team.full_name}
                        </h1>
                        <div className="text-[12px] text-[#777777] flex items-center">
                          {game.home_team.abbreviation} vs {game.visitor_team.abbreviation}
                          <div className="h-[4px] w-[4px] bg-[#878787] rounded-full mx-[5px]" />
                          {formatTime(game.date)}
                        </div>
                      </div>
                    </TableCell>

                    {/* SPREAD (placeholder for now) */}
                    <TableCell>{game.spread}</TableCell>

                    {/* TOTAL (placeholder) */}
                    <TableCell>{game.total}</TableCell>

                    {/* WIN PROBABILITY (placeholder bar) */}
                    <TableCell className="w-[20vw]">
                      <div className="flex items-center">
                        <div className=' mr-[3px]'>
                          <p>{game.home_team.abbreviation}</p>
                          <h1 className=' font-semibold'>{Math.round(game.win_probability * 100)}%</h1>
                        </div>
                        <div className="w-[15vw] h-[8px] bg-[#DADDE1] rounded-full mr-3">
                          <div style={{ width: `${Math.round(game.win_probability * 100)}%` }} className={`h-full bg-[#2FC337] rounded-full`} />
                        </div>
                        <div className=' mr-[3px]'>
                          <p>{game.visitor_team.abbreviation}</p>
                          <h1 className=' font-semibold'>{100 - Math.round(game.win_probability * 100)}%</h1>
                        </div>
                      </div>
                    </TableCell>

                    {/* EDGE */}
                    <TableCell className="text-right">{game.edge}</TableCell>

                    {/* STATUS */}
                    {/* <TableCell className="text-right">
                                            <div className={`inline-flex px-3 py-1 border rounded-md ${formatStatus(game.status) === "Upcoming" && "bg-[#4753671A] text-black border-[#E4E7EC]"}`}>
                                                {formatStatus(game.status)}
                                            </div>
                                        </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* <div className=" w-full">
          <h1 className=" text-[18px] font-semibold mb-[8px]">Model Performance</h1>
          <div className=" w-full h-[65vh] bg-[#FFFFFF] dark:bg-[#232323] rounded-2xl flex items-center justify-center">
            <WeeklyAccuracyChart />
          </div>
        </div> */}

        <div className=" w-full">
          <h1 className=" text-[18px] font-semibold mb-[8px]">Totals Chart</h1>
          <div className=" w-full h-[65vh] bg-[#FFFFFF] dark:bg-[#232323] rounded-2xl flex items-center justify-center">
            <WeeklyTotalsBarChart games={games} />
          </div>
        </div>

        <div className=" w-full">
          <h1 className=" text-[18px] font-semibold mb-[8px]">Spread Chart</h1>
          <div className=" w-full h-[65vh] bg-[#FFFFFF] dark:bg-[#232323] rounded-2xl flex items-center justify-center">
            <WeeklyEdgeBarChart games={games} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page