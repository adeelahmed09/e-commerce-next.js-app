"use client"
import React, { useState } from 'react'

function AddProduct() {
    const [rawFormData, setRawFormData] = useState(
        {
            tilte:"",
            desc:"",
            stock:0,
            publish:null,
            productImage:""
        }
    )
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='lg:text-2xl text-xl font-[space] text-white'>Add Product</h1>
      <div>
        <form className='w-full grid grid-cols-2 items-center gap-9 border-2 border-gray-700 py-4 px-7 rounded-md'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="title" className='text-lg font-semibold font-[space] text-white'>Title :</label>
                    <input type="text" id='title' className='w-[250px] py-1 px-3 outline-none border-2 border-gray-700 rounded-md bg-transparent text-white'  />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="desc" className='text-lg font-semibold font-[space] text-white'>Description :</label>
                    <textarea  className=' py-1 px-3 outline-none border-2 border-gray-700 rounded-md bg-transparent text-white' id="desc" name="w3review" rows="4" cols="30"></textarea>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="stock" className='text-lg font-semibold font-[space] text-white'>Stock :</label>
                    <input type="number" id='stock' className='w-[250px] py-1 px-3 outline-none border-2 border-gray-700 rounded-md bg-transparent text-white'  />
                </div>
                <div className='flex gap-2 '>
                    <label htmlFor="publish" className='text-lg font-semibold font-[space] text-white'>Publish :</label>
                    <input type="checkbox" id='publish' className='w-4'   />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="price" className='text-lg font-semibold font-[space] text-white'>Price :</label>
                    <input type="number" id='price' className='w-[250px] py-1 px-3 outline-none border-2 border-gray-700 rounded-md bg-transparent text-white'  />
                </div>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center w-fit'>
                <img src="/noProfile.png" className='w-[250px] h-[250px] object-center object-cover rounded-lg' alt="" />
                <input type="file"  className='text-white w-[235px] font-[space]'/>
            </div>
            <div className='w-full flex justify-center items-center gap-2 col-span-2'>
                <button className='text-white bg-green-500 rounded-md py-1 px-2 '>Submit</button>
                <button className='text-white bg-red-500 rounded-md py-1 px-2 '>Cancel</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
