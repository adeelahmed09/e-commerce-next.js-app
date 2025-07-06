"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { changeQuantity, setCart } from '@/slice/cartSlice'
import store from '@/store/store'
import axios from 'axios'
function page() {
  const [process, setProcess] = useState(false)
  const [first, setfirst] = useState()
  const dispatch = useDispatch()
  const { totalProduct, totalPrice, products } = useSelector((state) => state.cart || {})
  const [firstEffectStoper, setFirstEffectStoper] = useState(false)
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState(
    {

    }
  )
  const [quantity, setQuantity] = useState(0)
  const [previousState, setPreviousState] = useState({})
  const loader = useRef(null)
  const loaderBack = useRef(null)
  useEffect(() => {
    if (status === "authenticated") {
      console.log(status);
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
  useEffect(() => {
    if (firstEffectStoper) {
      console.log(totalProduct);
      axios.post("/api/cart/change-cart", {
        userid: userDetails.id,
        totalProduct,
        totalPrice,
        products,
      })
      .then((res)=>{
        setPreviousState(store.getState().cart)
      })
      .catch((err)=>{
        console.log(err);
        dispatch(setCart(previousState))
      })
    }
    else{
    setFirstEffectStoper(true)
    }
  }, [products])
  const onChangeProductCartHandler = (e, id) => {
    if (e.target.value < 1) {
      alert("Amount cannot be zero")
      return
    }
    else if(e.target.value >5){
      alert("You cannot add more than 5 same Products ")
      return
    }
    const previousCart = store.getState().cart
    setPreviousState(previousCart)
    const prevQuantity = previousCart.products.filter(
      (product) => {
        const pro = product._id === id
        return pro
      })
    const newQuantity = e.target.value
    const intQuantity = parseInt(newQuantity)
    console.log(intQuantity);
    dispatch(changeQuantity({ intQuantity, id }))
    console.log(totalProduct);

  }

  const renderCart = () => {
    if (status !== "authenticated") {
      return (
        <div className='w-full flex justify-center items-center '>
          <h1 className='text-3xl text-white font-semibold'>Please Sign In</h1>
        </div>
      )
    }
    if (!totalProduct) {
      return (
        <div className='w-full flex justify-center items-center '>
          <h1 className='text-3xl text-white font-semibold'>No Product Added</h1>
        </div>
      )
    }
    return products.map((product, index) => (
      <div key={index} className='px-3 py-2 w-full rounded-lg flex items-center gap-2 border-gray-700 border-2' id={product._id}>
        <img className='w-[75px] h-[75px] rounded-lg object-center object-cover' src={product.image} alt="" />
        <div className='flex flex-col'>
          <h1 className='text-lg font-simebold text-white line-clamp-1 w-[250px]'>{product.title}</h1>
          <h2 className='text-md font-simebold text-white'>Price : {product.price}</h2>
        </div>
        <div>
          <input type="number" value={product.quantity} onChange={(e) => onChangeProductCartHandler(e, product._id)} className='w-[50px] rounded-sm font-semibold px-2 py-1 text-lg' />
        </div>
      </div>
    ))
  }
  const totalPriceRender = () => {
    if (totalPrice) {
      return (
        <div className='px-3 py-1 w-full flex justify-between '>
          <h1 className='text-white text-xl font-semibold'>Total Price</h1>
          <h1 className='text-white text-lg font-semibold'>{totalPrice}</h1>
        </div>
      )
    }
  }
  return (
    <div className=" px-[5vw] pt-[94px] w-full h-screen  relative">
      <div ref={loaderBack} className='bg-white/10 flex backdrop-blur-md w-full h-screen fixed  items-center justify-center top-0 right-0 '>
        <div ref={loader} className=' w-10 h-10 border-t-4 border-[#0A84FF] rounded-full'></div>
      </div>
      <div className='w-full h-full sm:p-6 p-2 flex  items-center justify-center '>
        <div className='w-[500px]  flex gap-2 items-center justify-center flex-col'>
          <div className='w-full'>
            {renderCart()}
          </div>
          <div className='w-full'>
            {totalPriceRender()}
          </div>
        </div>
      </div>
    </div>
  )


}

export default page
