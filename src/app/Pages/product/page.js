"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios';
function page() {
    const [process, setProcess] = useState(false)
    const [product, setProduct] = useState({
    })
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
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
    const getProduct = async () => {
        setProcess(true)
        try {
            const product = await axios.post("/api/get-product",
                { id: id })
            if (product.data.product) {
                setProcess(false)
                setProduct(product.data.product)
            }
            setProcess(false)
        } catch (error) {
            console.log(error);
            setProcess(false)
        }
    }
    useEffect(() => {
        getProduct()
    }, [])
    useEffect(() => {
        console.log(product);
    }, [product])
    return (
        <div className=' relative w-full overflow-hidden'>
            <div ref={loaderBack} className='bg-white/10 flex backdrop-blur-md w-full h-screen fixed  items-center justify-center top-0 right-0 '>
                <div ref={loader} className=' w-10 h-10 border-t-4 border-[#0A84FF] rounded-full'>

                </div>
            </div>
            <div className='mt-[2vw] w-full  px-[5vw] pt-[94px]'>
                <div className='w-full flex sm:p-4 p-1'>
                    <div className='w-[45%] rounded-xl overflow-hidden h-[75vh]'>
                        <img src={product ? product.image : ""} className='w-full h-full' alt="" />
                    </div>
                    <div className='w-[50vw] px-5 flex flex-col gap-2 items-start justify-center'>
                        <h1 className='text-3xl font-bold font-[space] text-white'>{product.title}</h1>
                        <h2 className='text-white text-lg'>{product.desc}</h2>
                        <p className='text-white '>Stock : {product.stock}</p>
                        <h2 className='text-white text-xl mt-2'>Price :Rs.{product.price}</h2>
                        <div className='w-full flex justify-end items-center gap-2'>
                            <button className='px-3 py-2 rounded-sm bg-orange-600 text-lg font-semibold text-white'>Buy Product</button>
                            <button className='px-3 py-2 rounded-sm bg-red-600 text-lg font-semibold text-white'>Add To Cart</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page
