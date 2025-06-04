'use client'
import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link'

function AdminNav() {
  const pathname = usePathname();
  return (
    <div className=' text-white sm:text-2xl text-xl font-medium'>
      <Link className={`${pathname === "/admin/dashboard" ? "text-[#0A84FF]" : "text-white"} `} href={"/admin/dashboard"}>Dashboard</Link> \ <Link href={"/admin/orders"} className={`${pathname === "/admin/orders" ? "text-[#0A84FF]" : "text-white"} `}>Orders</Link> \ <Link href={"/admin/products"} className={`${pathname === "/admin/products" ? "text-[#0A84FF]" : "text-white"} `}>Product</Link></div>
  )

}

export default AdminNav
