import React from 'react'

const page = () => {
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
            </div>
        </div>
    )
}

export default page