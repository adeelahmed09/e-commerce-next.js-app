"use client"
import { setCart } from '@/slice/cartSlice'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CartFE() {
  const dispatch = useDispatch()
  const [productAmount, setproductAmount] = useState(0)
  const { totalProduct, totalPrice, products } = useSelector((state) => state.cart || {})
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState(
    {

    }
  )
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
    setproductAmount(totalProduct)
  }, [totalProduct])

  useEffect(() => {
    axios.post("/api/cart/give-cart", { userid: session?.user?.id })
      .then((res) => {
        const cart = res.data.cart
        dispatch(setCart(cart))
      })
      .catch((error) => {
        console.log(error);
        alert("Error")
      })
  }, [session])
  return (
    <div className='fixed  sm:bottom-7  sm:right-10 top-4  left-20 text-2xl px-3 py-2 rounded-full bg-white/10 backdrop-blur-md   font-thin text-[#0A84FF]'>
      <Link href={"/cart"}><i className="ri-shopping-cart-line text-2xl"></i></Link>
      <h1 className='text-white text-sm absolute bg-red-600 px-2 text-center top-2 right-2 rounded-full'>
        {productAmount}
      </h1>
    </div>
  )
}

export default CartFE
