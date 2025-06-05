"use client"

import React, { useEffect, useState } from 'react'

import AdminNav from '@/app/admin/components/adminNav';
import { useSession } from "next-auth/react";
import axios from 'axios';

function page() {
  const { data: session, status } = useSession();
  const [allAdmins, setAllAdmins] = useState([])
  const [userDetails, setUserDetails] = useState(
    {

    }
  )
  useEffect(() => {
    if (status === "authenticated") {
      setUserDetails({
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.avatar,
        role: session.user.role,
        id: session.user.id
      })
      console.log(session);
    }
  }, [status]);
  const getAllAdmins = async () => {
    if (userDetails.role === "admin") {
      try {
        const result = await axios.get("/api/admin/get-all-admins")
        if (result.data.admins.length > 0) {
          setAllAdmins(result.data.admins)
        }
      } catch (error) {
        alert(error.response.data.error)
      }
    }
  }
  useEffect(()=>{
    getAllAdmins()
  },[userDetails])
  const renderAllAdmins =() => {
    return allAdmins.map((admin)=>(
      <div className='text-sm w-full flex sm:flex-row flex-col  justify-center sm:gap-5 gap-3 items-center border-2 border-gray-700 rounded-2xl py-2 px-4'>
        <div>
          <img src={admin.avatar} className='w-16 h-16 rounded-full object-cover object-center' alt="" />
        </div>
        <div className='flex flex-col lg:text-lg justify-center sm:items-start items-center'>
          <h3>{admin.name}</h3>
          <h4>{admin.email}</h4>
        </div>
        <div className='flex sm:flex-col flex-row gap-1'>
          <button className='px-2 py-1 bg-green-500 text-white rounded-md'>Edit</button>
          <button className='px-2 py-1 bg-red-500 text-white rounded-md'>Delete</button>
        </div>
      </div>
    ))
  }
  
  if (userDetails.role === "admin") {
    return (
      <div className='mt-[2vw] w-full px-[5vw] pt-[94px]'>
        <div className='sm:p-6 w-full '>
          <div className='p-4 border border-gray-700'>
            <AdminNav />
          </div>
          <div className='p-4 border border-gray-700 flex flex-col justify-center items-center lg:text-2xl text-xl text-white w-full mt-4'>
            <h1>All Admins</h1>
            <div className='my-5'>
              {userDetails?.role? renderAllAdmins():""}
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='w-full h-screen flex  justify-center items-center'>
        <h2 className='text-xl font-[space] text-white font-semibold'>
          You are Not Authorized
        </h2>
      </div>
    )
  }
}

export default page
