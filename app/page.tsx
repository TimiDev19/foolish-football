"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FadeInFromLeft } from "@/components/FadeInFromLeft";
import { FadeInFromRight } from "@/components/FadeInFromRight";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // ✅ Store JWT in localStorage (client-side)
      localStorage.setItem("token", data.token);
      console.log("Logged in user:", data.admin);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed. Check credentials.");
    }
  }

  return (
    <div className="z-[100] h-[100vh] w-[100vw] bg-white fixed flex items-center justify-center">
      <div className=" w-[40%] h-full">
        <FadeInFromLeft>
          <div className="w-[100%] h-full flex flex-col items-start justify-center px-[2.5%]">
            <h1 className="text-[36px] font-semibold w-full">Welcome back!</h1>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleLogin} className="w-full">
              <label className="text-[14px] font-semibold">Email Address</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-[#D0D5DD] w-full rounded-sm h-[50px] p-[5px] focus:outline-none block mb-[10px]"
              />

              <label className="text-[14px] font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-[#D0D5DD] w-full h-[50px] p-[5px] focus:outline-none block mb-[30px]"
              />

              <button
                type="submit"
                className="bg-[#2FC337] text-[16px] font-semibold text-white w-full rounded-sm h-[50px] hover:shadow-lg cursor-pointer ease-in-out transform duration-500 hover:tracking-[0.5em] hover:shadow-[#2FC337]/60 flex items-center justify-center"
              >
                Login
              </button>
            </form>

            <p className="text-[#645D5D] text-[14px] text-center mt-4">
              Forgot Password?{" "}
              <Link
                href={"/forgotPassword"}
                className="text-[#2FC337] hover:underline"
              >
                Recover
              </Link>
            </p>
          </div>
        </FadeInFromLeft>
      </div>

      <div className=" w-[60%] h-full">
        <FadeInFromRight>
          <div className="w-[100%] h-full login"></div>
        </FadeInFromRight>
      </div>

    </div>
  );
};

export default Page;