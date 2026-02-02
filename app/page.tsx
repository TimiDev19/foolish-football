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
import { ChartBreakoutSquareIcon, Upload01Icon } from 'hugeicons-react';
import { getDashboardMetrics } from '@/lib/dashboard'

type DashboardMetrics = {
  gamesAnalyzed: number
  gamesDelta: number
  topEdge: {
    percentage: number
    matchup: string
  }
  modelAccuracy: {
    value: number
    delta: number
  }
}

export default function Home() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const season = 2025
  const week = 8

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch(`/api/analysis?season=2025&week=8`)
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setMetrics(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])


  // useEffect(() => {
  //   const fetchGames = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://api.balldontlie.io/nfl/v1/games?seasons[]=2025",
  //         {
  //           headers: {
  //             Authorization: process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY
  //           }
  //         }
  //       )

  //       const json = await res.json()
  //       setGames(json.data)
  //     } catch (err) {
  //       console.error("Failed to fetch games", err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchGames()
  // }, [])

  //   useEffect(() => {
  //     const fetchGames = async () => {
  //         try {
  //             const res = await fetch(
  //                 "https://api.balldontlie.io/nfl/v1/games?seasons[]=2025&status=scheduled&per_page=100",
  //                 {
  //                     headers: {
  //                         Authorization: process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY
  //                     }
  //                 }
  //             )

  //             const json = await res.json()

  //             // Sort by date descending
  //             const sortedGames = json.data.sort((a, b) => new Date(b.date) - new Date(a.date))

  //             setGames(sortedGames)
  //         } catch (err) {
  //             console.error("Failed to fetch games", err)
  //         } finally {
  //             setLoading(false)
  //         }
  //     }

  //     fetchGames()
  // }, [])

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch(
          "http://185.193.17.89:7000/api/games/featured?season=2025&week=8&page=1&limit=8&search="
        )
        const data = await res.json()
        setGames(data.games)
      } catch (err) {
        console.error("Failed to fetch games", err)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const getLogo = (abbr) =>
    `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr.toLowerCase()}.png`

  const formatTime = (date) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    })

  const formatStatus = (status) => {
    if (status === "in_progress") return "Live"
    if (status === "final") return "Completed"
    return "Upcoming"
  }

  return (
    <div className=" h-[100vh] w-[100vw] pl-[15vw]">
      <div className=" h-[64px] w-full bg-white darke:bg-[#1C1C1C] border-b border-[#E4E7EC] dark:border-[#282828] px-[4%] flex items-center justify-between mb-[20px]">
        <select name="" id="" className=" h-[40px] min-w-[117px] bg-[#F9FAFB] dark:bg-[#232323] dark:border dark:border-[#282828] text-[#555555] dark:text-white rounded-lg">
          <option value="">Week 12</option>
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
            <p className=" text-[#475367] dark:text-[#979797]">Week 12 Performance Analytics</p>
          </div>

          <div className=" flex items-center justify-between min-w-[138px] h-[40px] text-white px-[1%] bg-[#2FC337] dark:bg-[#232323] dark:border border-[#282828] rounded-lg">
            <Upload01Icon strokeWidth={1.5} />
            Export CSV
          </div>
        </div>

        <div className=" w-full flex items-center justify-between mb-[20px]">
          <div className=" h-[127px] w-[32%] rounded-lg bg-white dark:bg-[#1C1C1C] border border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            <div>
              <h1 className=" text-[14px] text-[#475367] dark:text-[#979797]">Games Analyzed</h1>
              <h1 className=" text-[24px] font-semibold">{games.length}</h1>
              <h1 className=" text-[14px] text-[#0F973D] dark:text-[#979797]">+{metrics?.gamesDelta ?? 0} from last week</h1>
            </div>

            <div className=" text-[#2FC337] dark:text-[#979797] bg-[#CDEBCF] dark:bg-[#232323] h-[52px] w-[52px] flex items-center justify-center rounded-lg">
              <ChartBreakoutSquareIcon />
            </div>
          </div>

          <div className=" h-[127px] w-[32%] rounded-lg bg-white dark:bg-[#1C1C1C] border border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            <div>
              <h1 className=" text-[14px] text-[#475367] dark:text-[#979797]">Top Edge Identified</h1>
              <h1 className=" text-[24px] font-semibold">56.8%</h1>
              <h1 className=" text-[14px] text-[#0F973D] dark:text-[#979797]">MIA vs ATL</h1>
            </div>

            <div className=" text-[#2FC337] dark:text-[#979797] bg-[#CDEBCF] dark:bg-[#232323] h-[52px] w-[52px] flex items-center justify-center rounded-lg">
              <ChartBreakoutSquareIcon />
            </div>
          </div>

          <div className=" h-[127px] w-[32%] rounded-lg bg-white dark:bg-[#1C1C1C] border border-[#E4E7EC] dark:border-[#282828] p-[2%] flex items-center justify-between">
            <div>
              <h1 className=" text-[14px] text-[#475367] dark:text-[#979797]">Model Accuracy</h1>
              <h1 className=" text-[24px] font-semibold">89.8%</h1>
              <h1 className=" text-[14px] text-[#0F973D] dark:text-[#979797]">+6.4% vs Avg</h1>
            </div>

            <div className=" text-[#2FC337] dark:text-[#979797] bg-[#CDEBCF] dark:bg-[#232323] h-[52px] w-[52px] flex items-center justify-center rounded-lg">
              <ChartBreakoutSquareIcon />
            </div>
          </div>
        </div>

        <div className=" w-full mb-[25px]">
          <h1 className=" text-[18px] font-semibold mb-[8px]">Featured Games - Week 12</h1>
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
                    className="border-b border-b-[#E4E7EC] dark:border-b-[#404040]"
                  >
                    {/* MATCHUP */}
                    <TableCell className="font-medium min-w-[45vw] flex items-center">
                      <img
                        src={getLogo(game.visitor_team.abbreviation)}
                        className="h-[40px] w-[40px] rounded-full mr-2"
                      />
                      <img
                        src={getLogo(game.home_team.abbreviation)}
                        className="h-[40px] w-[40px] rounded-full mr-3"
                      />

                      <div>
                        <h1 className="font-semibold text-[14px]">
                          {game.visitor_team.full_name} vs {game.home_team.full_name}
                        </h1>
                        <div className="text-[12px] text-[#777777] flex items-center">
                          {game.visitor_team.abbreviation} vs {game.home_team.abbreviation}
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
                        <div className="w-[15vw] h-[8px] bg-[#DADDE1] rounded-full mr-3">
                          <div style={{ width: `${Math.round(game.win_probability * 100)}%` }} className={`h-full bg-[#2FC337] rounded-full`} />
                        </div>
                        <span className="font-semibold">{Math.round(game.win_probability * 100)}%</span>
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

        <div className=" w-full">
          <h1 className=" text-[18px] font-semibold mb-[8px]">Model Performance</h1>
          <div className=" w-full h-[65vh] bg-[#FFFFFF] dark:bg-[#232323] rounded-2xl flex items-center justify-center">
            <WeeklyAccuracyChart />
          </div>
        </div>
      </div>
    </div>
  );
}
