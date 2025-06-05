"use client"
import React, { useEffect, useState } from 'react'
import AdminNav from '@/app/admin/components/adminNav';
import { useSession } from 'next-auth/react';
function page() {
  const { data: session, status } = useSession();
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
    }
  }, [status]);
  if (userDetails.role === "admin") {
    return (
      <div className='mt-[2vw] w-full px-[5vw] pt-[94px]'>
        <div className='sm:p-6 w-full '>
          <div className='p-4 border border-gray-700'>
            <AdminNav />
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
