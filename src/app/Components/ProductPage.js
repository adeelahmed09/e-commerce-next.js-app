"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct, setCart } from '@/slice/cartSlice';
import { useSession } from 'next-auth/react';
import store from '@/store/store';
function ProductPage() {
    const dispatch  = useDispatch()
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState(
            {
    
            }
        )
    const [productQunatity, setproductQunatity] = useState(1)
    const [process, setProcess] = useState(false)
    const [product, setProduct] = useState({
        
    })
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const loader = useRef(null)
    const loaderBack = useRef(null)
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
                setProduct({
                    _id:product.data.product._id,
                    image:product.data.product.image,
                    stock:product.data.product.stock,
                    title:product.data.product.title,
                    price:product.data.product.price,
                    desc:product.data.product.desc,
                    quantity:productQunatity

                })
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
    
    const onChangeQunatity = (e)=>{
        const {value} = e.target;
        const intValue = parseInt(value)
        if(intValue > product.stock){
            alert("Stock is not available")
            return
        }
        else if(intValue > 5){
            alert("You can buy only 5 product")
            return
        }
        setproductQunatity(intValue)
        setProduct({...product,quantity:intValue})
        console.log(product);
    }
    const addProductCart =()=>{
        if (status !== "authenticated"){
            alert("Please Sign In")
            return
        }
        const previousCart = store.getState().cart
        dispatch(addProduct({product}))
        try {
            axios.post("/api/cart/add-cart",{
                userid:userDetails.id,
                product:product,
            }).then((res)=>{console.log(res.data.cart);})
            .catch((error)=>{
                alert(error.message)
                console.log(error);
                dispatch(setCart(previousCart))
            })
        } catch (error) {
            alert(error.message)
             console.log(error);
            dispatch(setCart(previousCart))
        }
    }
    return (
        <div className=' relative w-full overflow-hidden'>
            <div ref={loaderBack} className='bg-white/10 flex backdrop-blur-md w-full h-screen fixed  items-center justify-center top-0 right-0 '>
                <div ref={loader} className=' w-10 h-10 border-t-4 border-[#0A84FF] rounded-full'></div>
            </div>
            <div className='mt-[2vw] w-full  px-[5vw] pt-[94px]'>
                <div className='w-full flex sm:flex-row flex-col sm:p-4 p-1'>
                    <div className='sm:w-[45%] w-[full] rounded-xl overflow-hidden sm:h-[75vh] h-[40vh]'>
                        <img src={product ? product.image : ""} className='w-full h-full object-cover object-center' alt="" />
                    </div>
                    <div className='sm:w-[50vw] w-full sm:px-5 flex flex-col  gap-2 items-start justify-center'>
                        <h1 className='sm:text-3xl text-xl font-bold font-[space] text-white'>{product.title}</h1>
                        <h2 className='text-white text-md'>{product.desc}</h2>
                        <p className='text-white '>Stock : {product.stock}</p>
                        <h2 className='text-white sm:text-xl text-lg mt-2'>Price :Rs.{product.price}</h2>
                        <div>
                            <input onChange={onChangeQunatity} className='bg-transparent text-white border-2 border-gray-700 outline-none  px-3 py-2 rounded-md w-28' type="number" value={productQunatity} name="qunatity" id="" />
                        </div>
                        <div className='w-full flex mb-3 justify-end items-center gap-2'>
                            <button className='px-3 py-2 rounded-sm bg-orange-600 sm:text-lg text-sm font-semibold text-white'>Buy Product</button>
                            <button className='px-3 py-2 rounded-sm bg-red-600 sm:text-lg text-sm font-semibold text-white' onClick={addProductCart}>Add To Cart</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductPage
