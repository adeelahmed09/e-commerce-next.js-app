"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function page() {
  const [products, setProducts] = useState([])
  const allProduct = async () => {
    setProcess(true)
    try {
      const products = await axios.get("/api/get-all-product");
      if (products.data.products) {
        setProducts(products.data.products)
        setProcess(false)
      }
      setProcess(false)
    } catch (error) {
      alert(error)
      setProcess(false)
    }
  }
  useEffect(() => {
    allProduct()
  }, [])
  const renderProduct = () => {
    console.log(products);
    return products.map((product, index) => {
      return (
        <div key={index} id={product._id} className='sm:w-[268px] w-[80vw] px-2 rounded-md bg-[#26292F] py-2' >
          <div className='w-full overflow-hidden rounded-xl sm:h-[250px]'>
            <img className='w-full h-full object-cover object-center' src={product.image} alt="NO IMAGE" />
          </div>
          <h2 className='text-white font-[space] text-lg line-clamp-2'>
            {`${product.title}`}
          </h2>
          <h3 className='text-white font-medium text-lg'>
            Price : Rs.{product.price}
          </h3>
          <div className='w-full flex justify-end items-center'>
            <button className='flex items-center justify-center'>
              <Link href={{ pathname: "/pages/product", query: { id: product._id } }} className='px-2 py-1 text-white bg-orange-500 text-lg font-semibold rounded-md '>Buy Now</Link>
            </button>
          </div>
        </div>
      )
    })
  }
  const [process, setProcess] = useState(false)
  const loader = useRef(null)
  const loaderBack = useRef(null)
  useEffect(() => {

    if (process) {
      loaderBack.current.classList.remove("hidden")
      loaderBack.current.classList.add("flex")
    }
    else {
      loaderBack.current.classList.remove("flex")
      loaderBack.current.classList.add("hidden")
    }
  }, [process])
  useGSAP(function () {
    gsap.to(loader.current, {
      rotate: 360,
      duration: .5,
      repeat: -1,
    })
  })
  return (
    <div className='w-full relative'>
      <div ref={loaderBack} className='bg-white/10 flex backdrop-blur-md w-full h-screen fixed  items-center justify-center top-0 right-0 '>
        <div ref={loader} className=' w-10 h-10 border-t-4 border-[#0A84FF] rounded-full'></div>
      </div>
      <div className='mt-[2vw] px-[5vw] pt-[94px]'>
        <div className='w-full sm:p-4 p-1'>
          <div className='w-full'>
            <div className='w-full flex justify-end'>
              <span className='flex gap-1 items-center justify-center'>
                <input type="text" placeholder='Search' className='bg-transparent border-2 py-1 px-3 rounded-2xl text-white outline-none border-gray-600 ' />
                <i className="ri-search-line text-2xl text-[#0A84FF]"></i>
              </span>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-y-5 items-center justify-items-center mt-3 '>
              {renderProduct()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
