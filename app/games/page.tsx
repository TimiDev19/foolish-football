"use client"
import React, { useEffect, useState } from 'react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { Upload01Icon } from 'hugeicons-react';


const page = () => {
    const router = useRouter()

    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
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
    //             setGames(json.data)
    //         } catch (err) {
    //             console.error("Failed to fetch games", err)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchGames()
    // }, [])

    // useEffect(() => {
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
        if (status === "Final") return "Completed"
        if (status === "Final/OT") return "Completed"
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
                        <h1 className=" text-[24px] font-semibold">Games</h1>
                        <p className=" text-[#475367] dark:text-[#979797]">Week 12 Matchups</p>
                    </div>

                    <div className=' flex items-center justify-center'>
                        <div className=' h-[40px] w-[282px] bg-white border border-[#E4E7EC] mr-[20px] rounded-lg flex items-center justify-start p-2'>
                            <SearchIcon />
                            <input type="text" className=' text-[14px] w-full focus:outline-none' placeholder='Search here' />
                        </div>
                        <div className=" flex items-center justify-between min-w-[120px] h-[40px] text-white px-[1%] bg-[#2FC337] dark:bg-[#232323] dark:border border-[#282828] rounded-lg">
                            <Upload01Icon strokeWidth={1.5} />
                            Export CSV
                        </div>
                    </div>
                </div>

                <div className=" w-full mb-[25px]">
                    <h1 className=" text-[18px] font-semibold mb-[8px]">Featured Games - Week 12</h1>
                    <div className=" w-full h-[75vh] overflow-y-scroll bg-[#FFFFFF] dark:bg-[#1C1C1C] rounded-2xl">
                        <Table>
                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] text-[#475367] dark:text-[#878787]">Matchup</TableHead>
                                    <TableHead className=" text-[#475367] dark:text-[#878787]">Spread</TableHead>
                                    <TableHead className=" text-[#475367] dark:text-[#878787]">Total</TableHead>
                                    <TableHead className=" text-[#475367] dark:text-[#878787]">Win Probability</TableHead>
                                    <TableHead className=" text-[#475367] dark:text-[#878787] text-right">Edge</TableHead>
                                    <TableHead className=" text-[#475367] dark:text-[#878787] text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            {/* <TableBody>
                                <TableRow className=" border-b border-b-[#E4E7EC] dark:border-b-[#404040]">
                                    <TableCell className="font-medium w-[25vw] bg-transparent flex items-center justify-start">
                                        <div className=" h-[40px] w-[40px] bg-[#FC4C02] rounded-full"></div>
                                        <div className=" h-[40px] w-[40px] bg-[#E31837] rounded-full mr-3"></div>

                                        <div>
                                            <h1 className=" font-semibold text-[14px]">Bills vs CHIEFS</h1>
                                            <div className=" text-[12px] text-[#777777] flex items-center justify-start">BUF vs KC <div className=" h-[4px] w-[4px] bg-[#878787] rounded-full mx-[5px]"></div> 13 Jan <div className=" h-[4px] w-[4px] bg-[#878787] rounded-full mx-[5px]"></div> 20:15</div>
                                        </div>
                                    </TableCell>

                                    <TableCell>KC -2.5</TableCell>

                                    <TableCell>51.5</TableCell>

                                    <TableCell className=" w-[20vw]">
                                        <div className=" w-full h-full flex items-center justify-center">
                                            <div className=" w-[15vw] h-[8px] bg-[#DADDE1] dark:bg-[#878787] my-auto mr-3 rounded-full">
                                                <div className=" w-[80%] h-full bg-[#2FC337] rounded-full"></div>
                                            </div>
                                            <h1 className=" text-[#475367] dark:text-white font-semibold">80%</h1>
                                        </div>
                                    </TableCell>

                                    <TableCell className="">
                                        <div className=" w-full h-full flex items-center justify-end">
                                            <div className=" w-[49px] h-[30px] flex items-center justify-center border border-[#2FC337] rounded-md bg-[#2FC33733]">
                                                <h1 className=" text-[12px] text-[#2FC337]">3.2%</h1>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="">
                                        <div className=" w-full h-full flex items-center justify-end">
                                            <div className=" min-w-[49px] h-[30px] flex items-center justify-center border border-[#6565FF] rounded-md bg-[#6565FF33] p-2">
                                                <h1 className=" text-[12px] text-[#6565FF]">Completed</h1>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody> */}
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
                                        // onClick={() => router.push(
                                        //     `/games/${game.id}?visitor=${game.visitor_team.abbreviation}&home=${game.home_team.abbreviation}&date=${game.date}&status=${game.status}`
                                        // )}

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
                                        <TableCell className="text-right">
                                            <div className={`inline-flex px-3 py-1 border capitalize rounded-md ${game.status === "Upcoming" && "bg-[#4753671A] text-black border-[#E4E7EC]"} ${game.status === "completed" && "bg-[#6565FF33] text-[#6565FF] border-[#6565FF]"}`}>
                                                {game.status}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    // <TableRow
                                    //     key={game.id}
                                    //     className="border-b border-b-[#E4E7EC] dark:border-b-[#404040] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                    // >
                                    //     <Link href={`/games/${game.id}`} className="contents">
                                    //         <TableCell className="font-medium w-[25vw] flex items-center">
                                    //             <img
                                    //                 src={getLogo(game.visitor_team.abbreviation)}
                                    //                 className="h-[40px] w-[40px] rounded-full mr-2"
                                    //             />
                                    //             <img
                                    //                 src={getLogo(game.home_team.abbreviation)}
                                    //                 className="h-[40px] w-[40px] rounded-full mr-3"
                                    //             />

                                    //             <div>
                                    //                 <h1 className="font-semibold text-[14px]">
                                    //                     {game.visitor_team.full_name} vs {game.home_team.full_name}
                                    //                 </h1>
                                    //                 <div className="text-[12px] text-[#777777] flex items-center">
                                    //                     {game.visitor_team.abbreviation} vs {game.home_team.abbreviation}
                                    //                     <div className="h-[4px] w-[4px] bg-[#878787] rounded-full mx-[5px]" />
                                    //                     {formatTime(game.date)}
                                    //                 </div>
                                    //             </div>
                                    //         </TableCell>

                                    //         {/* SPREAD */}
                                    //         <TableCell>—</TableCell>

                                    //         {/* TOTAL */}
                                    //         <TableCell>—</TableCell>

                                    //         {/* WIN PROB */}
                                    //         <TableCell>—</TableCell>

                                    //         {/* EDGE */}
                                    //         <TableCell className="text-right">—</TableCell>

                                    //         {/* STATUS */}
                                    //         <TableCell className="text-right">{formatStatus(game.status)}</TableCell>
                                    //     </Link>
                                    // </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page