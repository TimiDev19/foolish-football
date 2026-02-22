"use client"
import { useSearchParams } from "next/navigation"
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { BulbIcon, Upload01Icon } from "hugeicons-react";
import TeamRadarChart from "@/components/TeamRadarChart";

const GameDetail = () => {
    const searchParams = useSearchParams()

    const visitorAbbr = searchParams.get("visitor")
    const homeAbbr = searchParams.get("home")
    const visitor = searchParams.get("visitor_name")
    const home = searchParams.get("home_name")
    const visitorScore = searchParams.get("visitor_score")
    const homeScore = searchParams.get("home_score")
    const date = searchParams.get("date")
    const status = searchParams.get("status")
    const stadium = searchParams.get("stadium")
    const spread = searchParams.get("spread")
    const total = searchParams.get("total")
    const win_probability = searchParams.get("win_probability")

    if (!visitor || !home) return <div>Game data not available</div>

    const getLogo = (abbr: string) =>
        `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr.toLowerCase()}.png`

    const formatTime = (dateStr: string) =>
        dateStr
            ? new Date(dateStr).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
            })
            : "TBD"

    return (
        <div className="h-[100vh] w-[100vw] pl-[15vw]">
            <div className=" h-[64px] w-full bg-white darke:bg-[#1C1C1C] border-b border-[#E4E7EC] dark:border-[#282828] px-[4%] flex items-center justify-between mb-[20px]">
                <select name="" id="" className=" h-[40px] min-w-[117px] bg-[#F9FAFB] dark:bg-[#232323] dark:border dark:border-[#282828] text-[#555555] dark:text-white rounded-lg">
                    <option value="">Week 12</option>
                </select>

                <div className=" flex items-center justify-between w-[105px] h-[36px] text-[#475367] dark:text-white px-[1%] bg-[#FFFFFF] dark:bg-[#232323] border border-[#E4E7EC] dark:border-[#282828] rounded-lg">
                    <div className=" h-[8px] w-[8px] bg-[#2FC337] rounded-full"></div>
                    Live Data
                </div>
            </div>

            <div className=" w-full px-[2.5%] text-black dark:text-white mb-[20px]">
                <div className=" w-full flex items-center justify-between mb-[40px]">
                    <div>
                        <h1 className=" text-[24px] font-semibold">Games</h1>
                        <p className=" text-[#475367] dark:text-[#979797]">Week 12 Matchups</p>
                    </div>

                    <div className=' flex items-center justify-center'>
                        {/* <div className=' h-[40px] w-[282px] bg-white border border-[#E4E7EC] mr-[20px] rounded-lg flex items-center justify-start p-2'>
                            <SearchIcon />
                            <input type="text" className=' text-[14px] w-full focus:outline-none' placeholder='Search here' />
                        </div> */}
                        {/* <div className=" flex items-center justify-between min-w-[120px] h-[40px] text-white px-[1%] bg-[#2FC337] dark:bg-[#232323] dark:border border-[#282828] rounded-lg">
                            <Upload01Icon strokeWidth={1.5} />
                            Export CSV
                        </div> */}
                    </div>
                </div>

                {/* <div className=" w-full mb-[25px]">
                    <h1>{visitor} vs {home}</h1>
                    <p>Date: {new Date(date).toLocaleString()}</p>
                    <p>Status: {status}</p>
                    <p>{stadium}</p>
                </div> */}

                <div className="p-6 px-[2%] w-full mx-auto bg-white dark:bg-[#1C1C1C] rounded-xl border border-[#E4E7EC] h-[248px]">
                    <div className=" w-full flex items-center justify-center h-[50%] border-b border-b-[#E4E7EC]">
                        <h1 className=" text-[24px] text-black font-semibold mr-[20px]">{home}</h1>
                        {homeAbbr && (
                            <img
                                src={getLogo(homeAbbr)}
                                alt={home ?? "Team"}
                                className="h-[64px] w-[64px] mr-[20px]"
                            />)}

                        <div className=" flex flex-col items-center justify-center mr-[20px] text-center">
                            <h1 className=" text-[32px] text-black font-semibold">{homeScore} - {visitorScore}</h1>
                            <p className="text-center mb-4">{status}</p>
                        </div>

                        {visitorAbbr && (
                            <img
                                src={getLogo(visitorAbbr)}
                                alt={visitor}
                                className="h-[64px] w-[64px] mr-[20px]"
                            />)}

                        <h1 className=" text-[24px] text-black font-semibold mr-[20px]">{visitor}</h1>
                    </div>

                    <div className=" w-full h-[50%] flex items-center justify-between flex-col py-[0.5%]">
                        <div className=" w-full flex items-center justify-between">
                            <div className=" text-[14px] flex items-center justify-start text-[#475367]"><CalendarMonthOutlinedIcon className=" mr-2" /> {date ? new Date(date).toLocaleString() : "Date not available"}</div>
                        </div>

                        <div className=" w-full flex items-center justify-between">
                            <h1 className=" text-[14px] text-[#475367]">Spread: <span className=" text-black font-semibold">{spread}</span></h1>

                            <h1 className=" text-[14px] text-[#475367]">Total: <span className=" text-black font-semibold">{total}</span></h1>

                            <h1 className=" text-[14px] text-[#475367]">Win Probability (Home): <span className=" text-black font-semibold">{Math.round(win_probability * 100)}%</span></h1>
                        </div>
                    </div>







                    {/* <h1 className="text-2xl font-bold mb-4 text-center">
                        {visitor} vs {home}
                    </h1>

                    <p className="text-center mb-4">Date: {new Date(date).toLocaleString()}</p>
                    <p className="text-center mb-4">Status: {status}</p>

                    <div className="flex justify-between items-center">
                        
                        <div className="flex flex-col items-center">
                            <img
                                src={getLogo(visitorAbbr)}
                                alt={visitor}
                                className="h-[80px] w-[80px]"
                            />
                            <p className="mt-2 font-semibold">{visitor}</p>
                            <p className="mt-1 text-xl font-bold">{visitorScore}</p>
                        </div>

                        <div className="text-2xl font-bold">-</div>

                        
                        <div className="flex flex-col items-center">
                            <img
                                src={getLogo(homeAbbr)}
                                alt={home}
                                className="h-[80px] w-[80px]"
                            />
                            <p className="mt-2 font-semibold">{home}</p>
                            <p className="mt-1 text-xl font-bold">{homeScore}</p>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className=" w-full flex items-center justify-between px-[2.5%]">
                <div className=" min-h-[60vh] w-[48%] bg-[#FFFFFF] border border-[#E4E7EC] rounded-2xl">
                    <div className=" p-[2%] border-b border-b-[#E4E7EC] mb-[10px]">
                        <h1 className=" text-[24px] text-black font-semibold">Metrics</h1>
                    </div>

                    <div className="px-[2.5%]">
                        <div className=" w-full mb-4">
                            <div className=" text-[14px] flex items-center justify-between mb-2">
                                <h1>Offensive Rating</h1>

                                <div className="flex items-center justify-center">
                                    <h1 className=" mr-3">BUF : 112</h1>
                                    <h1>KC : 86</h1>
                                </div>
                            </div>

                            <div className=" w-full h-[12px] bg-[#1671D9] rounded-full">
                                <div className=" w-[63%] h-full bg-[#2FC337] rounded-full"></div>
                            </div>
                        </div>

                        <div className=" w-full mb-4">
                            <div className=" text-[14px] flex items-center justify-between mb-2">
                                <h1>Defensive Rating</h1>

                                <div className="flex items-center justify-center">
                                    <h1 className=" mr-3">BUF : 112</h1>
                                    <h1>KC : 86</h1>
                                </div>
                            </div>

                            <div className=" w-full h-[12px] bg-[#1671D9] rounded-full">
                                <div className=" w-[63%] h-full bg-[#2FC337] rounded-full"></div>
                            </div>
                        </div>

                        <div className=" w-full mb-4">
                            <div className=" text-[14px] flex items-center justify-between mb-2">
                                <h1>Pace</h1>

                                <div className="flex items-center justify-center">
                                    <h1 className=" mr-3">BUF : 112</h1>
                                    <h1>KC : 86</h1>
                                </div>
                            </div>

                            <div className=" w-full h-[12px] bg-[#1671D9] rounded-full">
                                <div className=" w-[63%] h-full bg-[#2FC337] rounded-full"></div>
                            </div>
                        </div>

                        <div className=" w-full mb-4">
                            <div className=" text-[14px] flex items-center justify-between mb-2">
                                <h1>Home Advantage</h1>

                                <div className="flex items-center justify-center">
                                    <h1 className=" mr-3">BUF : 112</h1>
                                    <h1>KC : 86</h1>
                                </div>
                            </div>

                            <div className=" w-full h-[12px] bg-[#1671D9] rounded-full">
                                <div className=" w-[63%] h-full bg-[#2FC337] rounded-full"></div>
                            </div>
                        </div>

                        <div className=" w-full mb-4">
                            <div className=" text-[14px] flex items-center justify-between mb-2">
                                <h1>Injury Impact</h1>

                                <div className="flex items-center justify-center">
                                    <h1 className=" mr-3">BUF : 112</h1>
                                    <h1>KC : 86</h1>
                                </div>
                            </div>

                            <div className=" w-full h-[12px] bg-[#1671D9] rounded-full">
                                <div className=" w-[63%] h-full bg-[#2FC337] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className=" px-[2.5%]">
                        <div className=" w-full min-h-[117px] bg-[#F9FAFB] border border-[#E4E7EC] rounded-md p-[2.5%]">
                            <h1 className=" text-[14px] text-[#475367] flex items-center justify-start font-semibold mb-[10px]"><BulbIcon strokeWidth={2} size={18} className=" mr-2" /> Model Insight</h1>

                            <p className=" text-[#475367] text-[14px] font-semibold">Bills shows a significant advantage in the game tonight (+26) while Chiefs relies on their pace which is being limited by Bill’s Offensive scheme.</p>
                        </div>
                    </div>
                </div>
                <div className=" min-h-[60vh] w-[48%] bg-[#FFFFFF] border border-[#E4E7EC] rounded-2xl">
                    <div className=" p-[2%] border-b border-b-[#E4E7EC]">
                        <h1 className=" text-[24px] text-black font-semibold">Power Rating</h1>
                    </div>
                    <div className=" flex items-center justify-center h-full w-full px-[2.5%]">
                        <TeamRadarChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameDetail
