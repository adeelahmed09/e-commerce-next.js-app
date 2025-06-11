"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
function page() {
    const [signUp, setSignUp] = useState(false)
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState(
        {

        }
    )
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            signOut({ callbackUrl: '/pages/login' });
        }
    };
    const adminRender = ()=>{
        if(userDetails.role === "admin"){
            return(
                <button className="px-3 bg-[#0A84FF] rounded-md py-1 text-xl font-semibold text-white"><Link href={"/admin/dashboard"}>Manage</Link></button>
            )
        }
    }
    useEffect(() => {
        if (status === "authenticated") {
            setSignUp(true);
            setUserDetails({
                name: session.user.name,
                email: session.user.email,
                avatar: session.user.avatar,
                role: session.user.role,
                id: session.user.id
            })
            console.log(session);
        } else {
            setSignUp(false);
        }
    }, [status]);

    useEffect(() => {
        console.log(userDetails);
    }, [userDetails])
    if (!signUp) {
        return (
            <div className="w-full flex flex-col gap-5 justify-center items-center  h-screen">
                <h1 className="text-3xl text-[#e6e6e6] font-[space] sm:w-fit w-[85vw] text-center">You Are Not Logged Please Login</h1>
                <div className="flex items-center justify-center gap-5">
                    <Link href={"../pages/sign-up"} className="text-xl  text-[#e6e6e6] bg-[#0A84FF] font-semibold px-3  py-2 rounded-lg">Sign Up</Link>
                    <Link href={"../pages/login"} className="text-xl text-[#e6e6e6] bg-[#0A84FF] font-semibold px-3 py-2 rounded-lg">Log In</Link>
                </div>
            </div>
        )
    }
    else {
        return (
            <>
            <div className="mt-[2vw] px-[5vw] pt-[94px] w-full">
                <div className="w-full sm:p-6 p-2 ">
                    <div className="w-full border p-4 flex sm:flex-row flex-col items-center justify-between sm:items-end h-fit rounded-lg shadow-md border-gray-700 ">
                        <div className="flex sm:flex-row flex-col items-center  p-6 gap-2">
                            <img className="w-32 h-32 object-center object-cover rounded-full" src={`${userDetails.avatar}`} alt="" />
                            <div className="flex flex-col sm:justify-center sm:items-start items-center">
                                <h2 className="text-2xl font-semibold text-white">{`${userDetails.name}`}</h2>
                                <h3 className="text-xl font-semibold text-white">{`${userDetails.email}`}</h3>
                            </div>
                        </div>
                        <div className=" flex flex-row flex-wrap  justify-center gap-2">
                            <button className="px-3 bg-green-500 rounded-md py-1 text-xl font-semibold text-white">Edit</button>
                            <button onClick={handleLogout} className="px-3 bg-red-500 rounded-md py-1 text-xl font-semibold text-white">Log Out</button>
                            {adminRender()}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-[5vw] mt-1  ">
                <div className="w-full  sm:p-6 p-2 ">
                    <div className="p-8 border rounded-md border-gray-700 ">
                        <h1 className="text-3xl font-semibold text-white">Orders</h1>
                        <div className="text-md font-medium text-white flex justify-center">
                            <p>No Order Yet</p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default page