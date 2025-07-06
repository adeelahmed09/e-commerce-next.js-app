"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

function HomeHero() {
  const container = useRef(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const onMouseMoveHandler = (e)=>{
    setX((e.clientX - container.current.getBoundingClientRect().x - container.current.getBoundingClientRect().width/2)/40)
    setY(-(e.clientY - container.current.getBoundingClientRect().y - container.current.getBoundingClientRect().height/2)/10)
  }
  
  useGSAP(function(){
    gsap.to(container.current,{
      transform: `rotateX(${y}deg) rotateY(${x}deg)`,
      duration:1,
      ease:"power4.out"
    })
  },[x,y])
  return (
    <div id="textContainer" onMouseMove={(e)=>{onMouseMoveHandler(e)}} className="w-full flex h-screen relative sm:px-20 px-5 py-5 flex-col sm:justify-center ">
      <img src="https://res.cloudinary.com/dsgftijpe/image/upload/f_auto,q_auto/HeroBg_rdczck.png"  className="w-screen  h-screen sm:flex hidden right-0 -z-0  brightness-70 object-right-top object-cover  absolute top-0" alt="" />
      <div ref={container} id="text" className="z-10 absolute w-fit ">
        <h1 className="z-10 sm:text-[6vw] mt-[13vh] sm:mt-0 text-5xl uppercase  tracking-tighter font-semibold  text-[#e6e6e6] font-[space]">
          Gear Up For
        </h1>
        <h1 className="z-10 uppercase sm:leading-[3vw] leading-[5.5vh] text-5xl sm:text-[6vw] tracking-tighter font-semibold  text-[#e6e6e6] font-[space]">
          For The <span className="text-[#0A84FF]">Future</span>
        </h1>
        <p className="z-10 sm:leading-[8vw] leading-5 mt-2 sm:text-xl text-lg  tracking-tight font-medium  text-[#e6e6e6] font-[space]">{"Everything you need. Nothing you don't. Discover the essentials."}</p>
        <Link href={"/shop"} className="z-10 sm:text-xl text-md mt-2 bg-[#0A84FF] w-fit px-3 py-2 rounded-lg flex justify-center items-center font-bold text-[#ffff] ">Shop Now</Link>
      </div>
      <img src="https://res.cloudinary.com/dsgftijpe/image/upload/f_auto,q_auto/HeroBgMobile_xxjmoc.png" className=" top-0 sm:hidden absolute w-screen object-cover left-0 brightness-70 -z-0 h-screen" alt="" />
    </div>
  )
}

export default HomeHero
