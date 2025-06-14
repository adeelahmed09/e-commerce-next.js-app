"use client"
import React, { useEffect, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
function page() {
    const router = useRouter()
    const [displayPassword, setDisplayPassword] = useState(false)
    const [process, setProcess] = useState(false)
    const visible = useRef(null)
    const hidden = useRef(null)
    const loader = useRef(null)
    const loaderBack = useRef(null)
    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
        }
    )
    const onClickEyeVisible = () => {
        setDisplayPassword(true);
        hidden.current.classList.add("hidden")
        visible.current.classList.remove("hidden")
    }
    const onClickEyeHidden = () => {
        setDisplayPassword(false)
        hidden.current.classList.remove("hidden")
        visible.current.classList.add("hidden")
    }
    const onChangeTextHandler = (e) => {
        const { value, name } = e.target
        setFormData({ ...formData, [name]: value })
        console.log(formData);
    }
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
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        setProcess(true)
        const result = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });
        console.log(result);
        if (result?.error) {
            alert(result.error)
            console.log(result.error);
            setProcess(false)


        } else {
            router.push("/");
            setFormData({
            email: "",
            password: "",
        })
            setProcess(false)
        }
    }
    return (
        <>
            <div ref={loaderBack} className='bg-white/10 hidden backdrop-blur-md w-full h-screen absolute  items-center justify-center top-0 right-0 '>
                <div ref={loader} className=' w-10 h-10 border-t-4 border-[#0A84FF] rounded-full'>

                </div>
            </div>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='border-2 border-[#0A84FF] px-12 py-10 rounded-3xl shadow-2xl'>
                    <form onSubmit={onSubmitHandler} className='flex text-[#0A84FF]  flex-col gap-2'>
                        <label htmlFor="email" className='text-2xl font-semibold'>Email</label>
                        <input onChange={onChangeTextHandler} type="email" className=' border-white border-2 px-3 py-1 rounded-lg w-56 outline-none bg-transparent text-white' name="email" id="email" required />
                        <label htmlFor="password" className='text-2xl mt-3 font-semibold'>Password</label>
                        <div className='flex gap-2'>
                            <input onChange={onChangeTextHandler} className=' border-white border-2 px-3 py-1 select-none rounded-lg w-56 outline-none bg-transparent text-white' name='password' type={`${displayPassword ? "text" : "password"}`} />
                            <div className='flex text-2xl h-full items-center'>
                                <i ref={visible} onClick={onClickEyeHidden} className="ri-eye-line hidden"></i>
                                <i ref={hidden} onClick={onClickEyeVisible} className="ri-eye-close-line flex"></i>
                            </div>
                        </div>
                        <div className=' flex mt-3 items-center gap-2'>
                            <button type='submit' className='py-2 px-3 rounded-lg font-semibold bg-green-500 text-white text-lg'>Submit</button>
                            <button className='py-2 px-3 rounded-lg  font-semibold bg-red-500 text-white text-lg'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page
