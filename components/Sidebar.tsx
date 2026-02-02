"use client"
import React, { useState } from 'react'
import Logo from "@/assets/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SportsRugbyOutlinedIcon from '@mui/icons-material/SportsRugbyOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { usePathname } from "next/navigation"
import { AmericanFootballIcon, DashboardSquare01Icon, DashboardSquareSettingIcon, RankingIcon, Upload01Icon } from 'hugeicons-react'

const Sidebar = () => {
    const [isDarkModeOn, setIsDarkModeOn] = useState(true)
    const pathname = usePathname()
    // const isActive = (href) => pathname === href
    const isActive = (href) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }


    return (
        <div className=' fixed bg-white dark:bg-[#1C1C1C] h-[100vh] z-[50] w-[15vw] border-r border-[#E4E7EC] dark:border-[#282828] text-black dark:text-white px-[0.5%] pb-[2.5%] flex flex-col items-center justify-between'>
            <div className=' w-full'>
                <div className=' flex items-center justify-start mb-[20px]'>
                    <Image
                        src={Logo}
                        alt='Foolish Football Logo'
                        className=' mr-2'
                    />

                    <h1 className=' text-[20px] font-bold'>NFL Analytics</h1>
                </div>

                <Link
                    href={"/"}
                    className={` w-full h-[44px] flex items-center justify-start mb-2 dark:bg-[#282828] rounded-md px-[5%] ${isActive("/")
                        ? "bg-[#CDEBCF] dark:bg-[#282828]"
                        : "hover:bg-[#CDEBCF] dark:hover:bg-[#282828] duration-500 ease-in-out group"
                        }`}
                >
                    <DashboardSquare01Icon strokeWidth={1.5} className={` mr-[5px] ${isActive("/")
                        ? "text-[#2FC337]"
                        : "text-[#475367] duration-500 ease-in-out group"
                        }`} />
                    Dashboard
                </Link>

                <Link
                    href={"/games"}
                    className={` w-full h-[44px] flex items-center justify-start mb-2 dark:bg-[#282828] rounded-md px-[5%] ${isActive("/games")
                        ? "bg-[#CDEBCF] dark:bg-[#282828]"
                        : "hover:bg-[#CDEBCF] dark:hover:bg-[#282828] duration-500 ease-in-out group"
                        }`}
                >
                    <AmericanFootballIcon strokeWidth={1.5} className={` mr-[5px] ${isActive("/games")
                        ? "text-[#2FC337]"
                        : "text-[#475367] duration-500 ease-in-out group"
                        }`} />
                    Games
                </Link>

                {/* <Link
                    href={"/"}
                    className={` w-full h-[44px] flex items-center justify-start mb-2 dark:bg-[#282828] rounded-md px-[5%] ${isActive("/teams")
                        ? "bg-[#CDEBCF] dark:bg-[#282828]"
                        : "hover:bg-[#CDEBCF] dark:hover:bg-[#282828] duration-500 ease-in-out group"
                        }`}
                >
                    <GroupsOutlinedIcon className={` mr-[5px] ${isActive("/teams")
                        ? "text-[#2FC337]"
                        : "text-[#475367] duration-500 ease-in-out group"
                        }`} />
                    Teams
                </Link> */}

                <Link
                    href={"/rankings"}
                    className={` w-full h-[44px] flex items-center justify-start mb-2 dark:bg-[#282828] rounded-md px-[5%] ${isActive("/rankings")
                        ? "bg-[#CDEBCF] dark:bg-[#282828]"
                        : "hover:bg-[#CDEBCF] dark:hover:bg-[#282828] duration-500 ease-in-out group"
                        }`}
                >
                    <RankingIcon strokeWidth={1.5} className={` mr-[5px] ${isActive("/rankings")
                        ? "text-[#2FC337]"
                        : "text-[#475367] duration-500 ease-in-out group"
                        }`} />
                    Rankings
                </Link>

                <Link
                    href={"/"}
                    className=' w-full h-[44px] flex items-center justify-start mb-2 hover:bg-[#CDEBCF] dark:hover:bg-[#282828] duration-500 ease-in-out group rounded-md px-[5%]'
                >
                    <Upload01Icon strokeWidth={1.5} className=" mr-[5px] text-[#475367] dark:text-white group-hover:text-[#2FC337]" />
                    Export
                </Link>

                <Link
                    href={"/"}
                    className=' w-full h-[44px] flex items-center justify-start mb-2 hover:bg-[#CDEBCF] dark:hover:bg-[#282828] duration-500 ease-in-out group rounded-md px-[5%]'
                >
                    <DashboardSquare01Icon strokeWidth={1.5} className=" mr-[5px] text-[#475367] dark:text-white group-hover:text-[#2FC337]" />
                    Model
                </Link>
            </div>

            {/* <div className=' w-[80%] flex items-center justify-between'>
                <LightModeOutlinedIcon className={`${isDarkModeOn ? "text-[#979797]" : "text-[#2FC337]"} `}/>

                <div onClick={() => setIsDarkModeOn(!isDarkModeOn)} className={` cursor-pointer w-[45%] h-[30px] bg-[#282828] rounded-full flex items-center ${isDarkModeOn ? "justify-end" : "justify-start"} ease-in-out duration-500 transform p-2`}>
                    <button onClick={() => setIsDarkModeOn(!isDarkModeOn)} className=' h-[24px] w-[24px] bg-[#2FC337] rounded-full cursor-pointer'></button>
                </div>
                
                <DarkModeOutlinedIcon className={`${isDarkModeOn ? "text-[#2FC337]" : "text-white" } `}/>
            </div> */}
        </div>
    )
}

export default Sidebar