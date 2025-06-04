"use client"
import Link from 'next/link'
import React from 'react'

function AboutUs() {
  return (
    <div className='w-full relative' id='aboutus'>
      <div className='w-full h-[10vh] -top-2 left-0 blur-md absolute bg-[#0D1117] '  ></div>
      <div className='w-full px-5 py-36 flex flex-col justify-center items-center '>
        <h1 className='text-[#0A84FF] font-[space] text-4xl text-center font-semibold'>About Us</h1>
        <p className='text-lg text-white text-center sm:px-[25vw] px-[2.5vw]'>
            We started this platform to make online shopping easy, fast, and affordable for everyone. Our goal is to deliver quality products with a smooth and secure shopping experience.
        </p>
        <h2 className='text-[#0A84FF] mt-4 text-xl font-semibold'>
            Why Us?
        </h2>
        <ul className=' grid grid-cols-2 justify-items-center text-lg text-white list-disc gap-x-5 gap-y-2'>
            <li>Secure Payments</li>
            <li>Fast Shipping</li>
            <li className='col-span-2'>Quality Products</li>
        </ul>
        <div className='mt-3'>
            <button className='bg-[#0A84FF] text-white px-3 py-1 rounded-md font-semibold'><Link href="#">Shop Now</Link></button>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
