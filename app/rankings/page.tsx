import { Upload01Icon } from 'hugeicons-react'
import React from 'react'

const page = () => {
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
                        <h1 className=" text-[24px] font-semibold">Teams & Ranking</h1>
                        <p className=" text-[#475367] dark:text-[#979797]">Week 12 Matchups</p>
                    </div>

                    <div className=' flex items-center justify-center'>
                        {/* <div className=' h-[40px] w-[282px] bg-white border border-[#E4E7EC] mr-[20px] rounded-lg flex items-center justify-start p-2'>
                            <SearchIcon />
                            <input type="text" className=' text-[14px] w-full focus:outline-none' placeholder='Search here' />
                        </div> */}
                        <div className=" flex items-center justify-between min-w-[120px] h-[40px] text-white px-[1%] bg-[#2FC337] dark:bg-[#232323] dark:border border-[#282828] rounded-lg">
                            <Upload01Icon strokeWidth={1.5} />
                            Export CSV
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page