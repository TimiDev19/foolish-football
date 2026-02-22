"use client"
import { ArrowTurnForwardIcon } from 'hugeicons-react'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
    const [selected, setSelected] = useState("ALL")
    return (
        <div className=" h-[100vh] w-[100vw] pl-[15vw]">
            <div className=" h-[64px] w-full bg-white dark:bg-[#1C1C1C] border-b border-[#E4E7EC] dark:border-[#282828] px-[4%] flex items-center justify-between mb-[20px]">
                <select name="" id="" className=" h-[40px] min-w-[117px] bg-[#F9FAFB] dark:bg-[#232323] dark:border dark:border-[#282828] text-[#555555] dark:text-white rounded-lg">
                    <option value="">Week 8</option>
                </select>

                <div className=" flex items-center justify-between w-[105px] h-[36px] text-[#475367] dark:text-white px-[1%] bg-[#FFFFFF] dark:bg-[#232323] border border-[#E4E7EC] dark:border-[#282828] rounded-lg">
                    <div className=" h-[8px] w-[8px] bg-[#2FC337] rounded-full"></div>
                    Live Data
                </div>
            </div>

            <div className=" w-full px-[2.5%] text-black dark:text-white">
                <div className=" w-full flex items-center justify-between mb-[20px]">
                    <div>
                        <h1 className=" text-[24px] font-semibold">Blog</h1>
                        <p className=" text-[#475367] dark:text-[#979797]">NFL analytics insights and predictions</p>
                    </div>
                </div>

                <div className=' w-full flex items-center justify-center mb-[20px]'>
                    <div className=' w-full h-[420px] blog-banner rounded-2xl flex flex-col items-start justify-center p-[10px]'>
                        <h1 className=' text-[#FFFFFF] font-bold text-[40px] mb-[10px]'>Seahawks claim Super Bowl 60 with 29-13 win over Patriots as Bad Bunny headlines halftime show</h1>
                        <p className=' text-[#FFFFFF] text-[16px] mb-[10px]'>The Seattle Seahawks dominated the New England Patriots, holding them scoreless through the first three quarters to win 29-13. <br /> Seattle's defense swarmed Patriots' quarterback Drake Maye all night, causing three turnovers, sacking him six times and returning one interception for a touchdown.</p>

                        <Link href={""} className=' flex items-center justify-start text-[16px] text-[#2FC337]'>Read Full Article <ArrowTurnForwardIcon strokeWidth={1.5} /></Link>
                    </div>
                </div>

                <div className=' w-full flex items-center justify-end mb-[20px]'>
                    <div className=' bg-white h-[40px] min-w-[219px] p-[1.5%] flex items-center justify-between border border-[#E4E7EC] rounded-md'>
                        <button onClick={() => setSelected("ALL")} className={` ${selected === "ALL" ? "text-[#2FC337] bg-[#F0F2F5]" : "text-[#98A2B3]"} text-[14px] hover:bg-[#F0F2F5] hover:text-[#2FC337] px-[3%] rounded-md py-[1.5%] mx-[3px] cursor-pointer`}>ALL</button>

                        <button onClick={() => setSelected("Predictions")} className={` ${selected === "Predictions" ? "text-[#2FC337] bg-[#F0F2F5]" : "text-[#98A2B3]"} text-[14px] hover:bg-[#F0F2F5] hover:text-[#2FC337] px-[3%] rounded-md py-[1.5%] mx-[3px] cursor-pointer`}>Predictions</button>

                        <button onClick={() => setSelected("Insights")} className={` ${selected === "Insights" ? "text-[#2FC337] bg-[#F0F2F5]" : "text-[#98A2B3]"} text-[14px] hover:bg-[#F0F2F5] hover:text-[#2FC337] px-[3%] rounded-md py-[1.5%] mx-[3px] cursor-pointer`}>Insights</button>
                    </div>
                </div>

                <div className=' w-full grid row-span-3'></div>
            </div>
        </div>
    )
}

export default page