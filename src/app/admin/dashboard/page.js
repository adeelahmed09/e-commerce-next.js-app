"use client"

import React, { useEffect } from 'react'

import AdminNav from '@/app/admin/components/adminNav';
function page() {
  return (
    <div className='mt-[2vw] w-full px-[5vw] pt-[94px]'>
      <div className='sm:p-6 w-full '>
        <div className='p-4 border border-gray-700'>
          <AdminNav/>
        </div>
      </div>
    </div>
  )
}

export default page
