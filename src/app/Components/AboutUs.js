"use client"
import Link from 'next/link'
import React from 'react'

function AboutUs() {
  return (
    <div className='w-full relative' id='aboutus'>
      <div className='w-full h-[10vh] -top-2 left-0 blur-md absolute bg-[#0D1117] '  ></div>
      <div className='w-full px-5 py-36 flex flex-col justify-center items-center '>
        <h1 className='text-[#0A84FF] font-[space] text-4xl text-center font-semibold'>About Us</h1>
        <div className='flex flex-col sm:flex-row w-full items-center justify-center gap-2 mt-5 '>
          <div className='flex flex-col sm:px-3 sm:w-[50%] w-[100%] gap-2 justify-center items-start'>
            <p className='text-lg text-white w-[100%] sm:text-start text-center '>
              We started this platform to make online shopping easy, fast, and affordable for everyone. Our goal is to deliver quality products with a smooth and secure shopping experience.
            </p>
            <h2 className='text-[#0A84FF] mt-4 text-xl font-semibold'>
              Why Us?
            </h2>
            <ul className=' grid sm:grid-cols-2 justify-items-center items-center text-lg text-white gap-x-5 gap-y-2'>
              <li><span>✓</span> Secure Payments</li>
              <li><span>🚚</span> Fast Shipping</li>
              <li className='sm:col-span-2'><span>⭐</span> Quality Products</li>
            </ul>
            <div className='mt-3'>
              <button className='bg-[#0A84FF] text-white px-3 py-1 rounded-md font-semibold'><Link href="/shop">Start Shopping</Link></button>
            </div>
          </div>
          <div>
            <img className='sm:w-[400px] h-[300px] shadow-2xl object-center object-cover rounded-xl sm:h-[350px]' src="https://res.cloudinary.com/dsgftijpe/image/upload/v1749623070/vecteezy_a-flat-design-illustration-depicting-a-desktop-computer_46884846_ylbggg.jpg" alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutUs
