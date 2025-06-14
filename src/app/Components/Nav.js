"use client"
import 'remixicon/fonts/remixicon.css'
import Link from "next/link"
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { usePathname } from 'next/navigation'

function Nav() {
  gsap.registerPlugin()
  const pathName = usePathname()
  const [indexMenue, setIndexMenue] = useState(0)
  const menu = useRef(null)
  const cancel = useRef(null)
  const menuNav = useRef(null)
  const pcNav = useRef(null)
  const menuNavBack = useRef(null)
  const onClickMenuHandler = () => {
    if (indexMenue == 0) {
      gsap.to(menuNav.current, {
        width: "70%",
        duration: .2,
      })
      gsap.to(menuNavBack.current, {
        width: "100%",
        duration: .2,
      })
      setIndexMenue(1);
      gsap.to(menu.current, {
        fontSize: 0,
        duration: 0.1,
      })
      gsap.to(cancel.current, {
        fontSize: 36,
        duration: 0.1,
        delay: 0.1,
        opacity: 100
      })
    }
  }
  const onClickCancel = () => {
    if (indexMenue == 1) {
      gsap.to(menuNav.current, {
        width: "0%",
        duration: .2,
      })
      gsap.to(menuNavBack.current, {
        width: "0%",
        duration: .2,
      })
      setIndexMenue(1);
      gsap.to(menu.current, {
        fontSize: 36,
        duration: 0.1,
        delay: 0.1,
      })
      gsap.to(cancel.current, {
        fontSize: 0,
        duration: 0.1,

        opacity: 0
      })
      setIndexMenue(0)
    }
  }
  useGSAP(function () {
    gsap.from(pcNav.current, {
      y: -100,
      duration: .5,
      opacity: 0,
      delay: .5,
    })
  })
  return (
    <>
      <div ref={pcNav}  className="w-full sm:flex  hidden justify-center items-center z-10 pt-[2vw] fixed top-0">
        <div className=" px-[5vw] w-[60vw] py-6 items-center flex justify-between bg-white/10 backdrop-blur-md  rounded-[50px]">
          <div className=" text-3xl font-bold text-[#0A84FF]">
            <h1> Logo</h1>
          </div>
          <div className="flex text-lg text-[#e6e6e6] font-semibold gap-5">
            <Link href={"/"} className={ `hover:text-[#0A84FF] hover:scale-110 transition ${pathName==="/"?"text-[#0A84FF]":null}`}>Home</Link>
            <Link href={"/shop"}  className={ `hover:text-[#0A84FF] hover:scale-110 transition ${pathName==="/pages/shop"?"text-[#0A84FF]":null}`}>Shop</Link>
            <Link href={"#"} className="hover:text-blue-400 hover:scale-110 transition">Contact Us</Link>
          </div>
        </div>
        <div className=' absolute right-12 text-2xl px-3 py-2 rounded-full bg-white/10 backdrop-blur-md   font-thin text-[#0A84FF] '>
           <Link href={"/profile"}><i className="ri-user-line"></i></Link>
        </div>
      </div>
      <div className=" fixed top-0 sm:hidden px-4 z-30   w-full pt-4">
        <i ref={menu} onClick={onClickMenuHandler} className="ri-menu-3-line  absolute right-5 text-4xl text-[#0A84FF]"></i>
        <i ref={cancel} onClick={onClickCancel} className=" text-[#0A84FF]  absolute right-5  text-0 opacity-0 ri-close-large-line"></i>
        <div className=' absolute left-5 text-2xl px-3 py-2 rounded-full bg-white/10 backdrop-blur-md   font-thin text-[#0A84FF] '>
           <Link href={"/profile"}><i className="ri-user-line"></i></Link>
        </div>
        
      </div>
      
      <div ref={menuNavBack} onClick={onClickCancel} className='sm:hidden flex justify-end fixed right-0 z-20 w-[0%]  h-screen'>
        <div ref={menuNav}  onClick={(e) => e.stopPropagation()} className='w-[0%]  overflow-hidden  text-2xl gap-5 font-semibold bg-white/10 backdrop-blur-md  text-[#e6e6e6] z-40 flex flex-col justify-center items-center h-screen'>
          <Link href={"/"} onClick={onClickCancel} className={`hover:text-blue-400 w-[70vw] text-center hover:scale-110 transition ${pathName==="/"?"text-[#0A84FF]":null}`}>Home</Link>
          <Link href={"/pages/shop"} onClick={onClickCancel}className={`hover:text-blue-400 w-[70vw] text-center hover:scale-110 transition ${pathName==="/pages/shop"?"text-[#0A84FF]":null}`}>Shop</Link>
          <Link href={"#"} onClick={onClickCancel} className="hover:text-blue-400 w-[70vw] text-center hover:scale-110 transition">Contact Us</Link>
        </div>
      </div>
    </>
  )
}

export default Nav