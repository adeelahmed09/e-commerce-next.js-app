"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function page() {
  const [products, setProducts] = useState([])
  const allProduct = async () => {
    try {
      const products = await axios.get("/api/get-all-product");
      if (products.data.products) {
        setProducts(products.data.products)
      }
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    allProduct()
  }, [])
  const renderProduct = () => {
    console.log(products);
    return products.map((product,index) => {
      return (
        <div key={index} id={product._id} className='sm:w-[268px] w-[80vw] px-2 rounded-md bg-[#26292F] py-2' >
          <div className='w-full overflow-hidden rounded-xl sm:h-[250px]'>
            <img className='w-full h-full' src={product.image} alt="NO IMAGE" />
          </div>
          <h2 className='text-white font-[space] text-lg line-clamp-2'>
            {`${product.title}`}
          </h2>
          <h3 className='text-white font-medium text-lg'>
            Price : Rs.{product.price}
          </h3>
          <div className='w-full flex justify-end items-center'>
            <button className='flex items-center justify-center'>
              <Link href={{pathname:"/pages/product",query:{id:product._id}}} className='px-2 py-1 text-white bg-orange-500 text-lg font-semibold rounded-md '>Buy Now</Link>
            </button>
          </div>
        </div>
      )
    })
  }
  


  return (
    <div className='mt-[2vw] px-[5vw] pt-[94px]'>
      <div className='w-full sm:p-4 p-1'>
        <div className='w-full'>
          <div className='w-full flex justify-end'>
            <span className='flex gap-1 items-center justify-center'>
              <input type="text" placeholder='Search' className='bg-transparent border-2 py-1 px-3 rounded-2xl text-white outline-none border-gray-600 ' />
              <i className="ri-search-line text-2xl text-[#0A84FF]"></i>
            </span>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-3 items-center justify-items-center mt-3 '>
            {renderProduct()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
