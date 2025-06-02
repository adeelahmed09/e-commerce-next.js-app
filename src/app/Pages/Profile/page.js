"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import {  useSession } from "next-auth/react";

function page() {
    const [signUp, setSignUp] = useState(false)
    const { data: session, status } = useSession();
    const onClickHandler = ()=>{
        console.log("hello");
    }
     useEffect(() => {
            if (status === "authenticated") {
                setSignUp(true);
                console.log(session);
            } else {
                setSignUp(false);
            }
        }, [status]);
    if (!signUp) {
        return (
            <div className="w-full flex flex-col gap-5 justify-center items-center  h-screen">
                <h1 className="text-3xl text-[#e6e6e6] font-[space] sm:w-fit w-[85vw] text-center">You Are Not Logged Please Login</h1>
                <div className="flex items-center justify-center gap-5">
                    <Link href={"../pages/sign-up"}  className="text-xl  text-[#e6e6e6] bg-[#0A84FF] font-semibold px-3  py-2 rounded-lg">Sign Up</Link>
                    <Link href={"../pages/login"} className="text-xl text-[#e6e6e6] bg-[#0A84FF] font-semibold px-3 py-2 rounded-lg">Log In</Link>
                </div>
            </div>
        )
    }
}

export default page