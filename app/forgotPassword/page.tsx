import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className=' z-[100] h-[100vh] w-[100vw] bg-white fixed flex items-center justify-center'>
      <div className=' w-[40%] h-full flex flex-col items-start justify-center px-[2.5%]'>
        <h1 className=' text-[36px] font-semibold w-full'>Forgot Your Password?</h1>
        <p className=' mb-[20px] text-[#645D5D] text-[14px]'>Enter your email to reset your password</p>

        <form action="" className=' w-full'>
          <label htmlFor="" className=' text-[14px] font-semibold'>Email Address</label>
          <input type="text" className=' border border-[#D0D5DD] w-full rounded-sm h-[50px] p-[5px] focus:outline-none block mb-[10px]'/>

          {/* <label htmlFor="" className=' text-[14px] font-semibold'>Password</label>
          <input type="password" className=' border border-[#D0D5DD] w-full rounded-sm mb- h-[50px] p-[5px] focus:outline-none block mb-[30px]'/> */}

          <Link href={"/dashboard"} className=' bg-[#2FC337] text-[16px] font-semibold text-white w-full rounded-sm h-[50px] p-[5px] focus:outline-none block mb-[10px] cursor-pointer flex items-center justify-center'>Reset Password</Link>
          <p className=' mb-[20px] text-[#645D5D] text-[14px] text-center'>Back <Link href={"/"} className=' text-[#2FC337] hover:underline ease-in-out duration-500'>Login</Link></p>
        </form>
      </div>
      <div className=' w-[60%] h-full flex flex-col items-center justify-center forgot_Password'>

      </div>
    </div>
  )
}

export default page