"use client"
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

function page() {

    const [visble, setVisble] = useState(false)
    const [imgUrl, setImgUrl] = useState("/noProfile.png")
    const [process, setProcess] = useState(false)
    const visible = useRef(null)
    const hidden = useRef(null)
    const loader = useRef(null)
    const loaderBack = useRef(null)
    const [RAWformData, setRAWformData] = useState({
        name: "",
        files: "/noProfile.png",
        email: "",
        password: "",
    })
    const onChangeTextHandler = (e) => {
        const { value, name } = e.target
        setRAWformData({ ...RAWformData, [name]: value })
        console.log(RAWformData);
    }
    const onClickEyeVisible = () => {
        setVisble(true);
        hidden.current.classList.add("hidden")
        visible.current.classList.remove("hidden")
    }
    const onClickEyeHidden = () => {
        setVisble(false)
        hidden.current.classList.remove("hidden")
        visible.current.classList.add("hidden")
    }
    const onChangeFileHandler = (e) => {
        const { files, name } = e.target
        if (files[0].size > 2. * 1024 * 1024) {
            alert("Image must be under 2MB")
            e.target.value = ""
            setRAWformData({ ...RAWformData, files: "/noProfile.png" })
            setImgUrl("/noProfile.png")
            return
        }
        if ((files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/webp")) {
            alert("Please Add Correct Image type")
            setImgUrl("/noProfile.png")
            setRAWformData({ ...RAWformData, files: "/noProfile.png" })
            e.target.value = ""
            return
        }
        setRAWformData({ ...RAWformData, files: files[0] })
        const fileUrl = URL.createObjectURL(files[0])
        setImgUrl(fileUrl)
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setProcess(true)
        if (!RAWformData.name || !RAWformData.email || !RAWformData.password) {
            alert("Name , Email and Password Are required!!")
            setProcess(false)
        }
        if (RAWformData.files && RAWformData.files != "/noProfile.png") {
            console.log("enter");
            const formData = new FormData();
            formData.append("file", RAWformData.files)
            try {
                const uploadedImage = await axios.post("/api/image-uploader", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log(uploadedImage);
                if (uploadedImage.data.success) {
                    try {
                        const result = await axios.post("/api/sign-up", {
                            name: RAWformData.name,
                            email: RAWformData.email,
                            password: RAWformData.password,
                            files: uploadedImage.data.success
                        })
                        if (result.data.user) {
                            alert("Successfully Sign Up")
                            setProcess(false)
                            setImgUrl("/noProfile.png")
                            setRAWformData({
                                name: "",
                                files: "/noProfile.png",
                                email: "",
                                password: "",
                            })
                            return
                        }
                    } catch (error) {
                        alert(error)
                        setImgUrl("/noProfile.png")
                        setRAWformData({
                            name: "",
                            files: "/noProfile.png",
                            email: "",
                            password: "",
                        })
                        console.log(error);
                        setProcess(false)
                        return
                    }
                }
                else {
                    alert("Something Went Wrong During Image Uploading Please Try Again!!")
                    setImgUrl("/noProfile.png")
                    setRAWformData({
                        name: "",
                        files: "/noProfile.png",
                        email: "",
                        password: "",
                    })
                    setProcess(false)
                    return
                }
            } catch (error) {
                alert(`Error: Please Check Your Network :Something Went Wrong During Image Uploading Please Try Again!!`)
                setImgUrl("/noProfile.png")
                setRAWformData({
                    name: "",
                    files: "/noProfile.png",
                    email: "",
                    password: "",
                })
                setProcess(false)
                return
            }
        }
        try {
            const result = await axios.post("/api/sign-up", {
                name: RAWformData.name,
                email: RAWformData.email,
                password: RAWformData.password,
                files: RAWformData.files
            })
            if (result.data.user) {
                alert("Successfully Sign Up")
                setProcess(false)
                setImgUrl("/noProfile.png")
                setRAWformData({
                    name: "",
                    files: "/noProfile.png",
                    email: "",
                    password: "",
                })
                return
            }
        } catch (error) {
            alert(error)
            setRAWformData({
                name: "",
                files: "/noProfile.png",
                email: "",
                password: "",
            })
            console.log(error);
            setProcess(false)
            return
        }

        setProcess(false)
    }

    useGSAP(function () {
        gsap.to(loader.current, {
            rotate: 360,
            duration: .5,
            repeat: -1,
        })
    })

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
    return (
        <>
            <div ref={loaderBack} className='bg-white/10 hidden backdrop-blur-md w-full h-screen absolute  items-center justify-center top-0 right-0 '>
                <div ref={loader} className=' w-10 h-10 border-t-4 border-[#0A84FF] rounded-full'>

                </div>
            </div>
            <div className='w-full min-h-screen flex flex-col justify-center items-center'>
                <form onSubmit={onSubmitHandler} className=' w-[90%] sm:w-[65%] rounded-3xl shadow-lg shadow-[#0A84FF]  border-[#0A84FF] border-2 py-[5vw] grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-2  justify-items-center '>
                    <div className='flex flex-col gap-3'>
                        <div className='flex text-[#0A84FF] flex-col'>
                            <label htmlFor="name" className='text-2xl font-semibold'>Name :</label>
                            <input onChange={onChangeTextHandler} className=' border-white border-2 px-3 py-1 rounded-lg w-52 outline-none bg-transparent text-white' type="text" value={RAWformData.name} name="name" id="name" />
                        </div>
                        <div className='flex text-[#0A84FF] flex-col'>
                            <label htmlFor="email" className='text-2xl font-semibold'>Email :</label>
                            <input onChange={onChangeTextHandler} className=' border-white border-2 px-3 py-1 rounded-lg w-52 outline-none bg-transparent text-white' type="email" value={RAWformData.email} name="email" id="email" />
                        </div>
                        <div className='flex select-none text-[#0A84FF] flex-col'>
                            <label htmlFor="password" className='text-2xl font-semibold'>Password :</label>
                            <div className='flex gap-2'>
                                <input onChange={onChangeTextHandler} className=' border-white border-2 px-3 py-1 select-none rounded-lg w-52 outline-none bg-transparent text-white' name='password' value={RAWformData.password} type={`${visble ? "text" : "password"}`} />
                                <div className='flex text-2xl h-full items-center'>
                                    <i ref={visible} onClick={onClickEyeHidden} className="ri-eye-line hidden"></i>
                                    <i ref={hidden} onClick={onClickEyeVisible} className="ri-eye-close-line flex"></i>
                                </div>
                            </div>
                        </div>
                        <div className='text-white gap-2 w-52 flex justify-center items-center'>
                            <button type='submit' className=' bg-[#0A84FF] rounded-lg px-3 py-2' >
                                Submit
                            </button>
                            <button className=' bg-[#0A84FF] rounded-lg px-3 py-2'>
                                Cancel
                            </button>
                        </div>

                    </div>
                    <div className=' flex flex-col justify-center items-center gap-5'>
                        <img className='w-48 h-48 object-cover object-center rounded-3xl' src={`${imgUrl}`} alt="" />
                        <input onChange={onChangeFileHandler} className='text-white w-[210px]' name="file" id='file' type="file" />
                    </div>

                </form>
            </div>
        </>
    )
}

export default page