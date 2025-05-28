"use client"
import React, { useRef, useState } from 'react'

function page() {
    const [visble, setVisble] = useState(false)
    const [imgUrl, setImgUrl] = useState("/noProfile.png")
    const visible = useRef(null)
    const hidden = useRef(null)
    const [RAWformData, setRAWformData] = useState({
        name: "",
        files: "",
        email: "",
        password: "",
    })
    const onClickEyeVisible = ()=>{
        setVisble(true);
        hidden.current.classList.add("hidden")
        visible.current.classList.remove("hidden")
    }
    const onClickEyeHidden = ()=>{
        setVisble(false)
        hidden.current.classList.remove("hidden")
        visible.current.classList.add("hidden")
    }
    const onChangeFileHandler = (e) => {
        const { files, name } = e.target
        if (files[0].size > 1. * 1024 * 1024) {
            alert("Image must be under 1MB")
            e.target.value = ""
            setImgUrl("/noProfile.png")
            return
        }
        if ((files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/webp")) {
            alert("Please Add Correct Image type")
            setImgUrl("/noProfile.png")
            e.target.value = ""
            return
        }
        const fileUrl = URL.createObjectURL(files[0])
        setImgUrl(fileUrl)
    }
    const onSubmitHandler = async (e) => {

    }
    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center'>
            <form onSubmit={onSubmitHandler} className=' w-[90%] sm:w-[65%] rounded-3xl shadow-lg shadow-[#0A84FF]  border-[#0A84FF] border-2 py-[5vw] grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-2  justify-items-center '>
                <div className='flex flex-col gap-3'>
                    <div className='flex text-[#0A84FF] flex-col'>
                        <label htmlFor="name" className='text-2xl font-semibold'>Name :</label>
                        <input className=' border-white border-2 px-3 py-1 rounded-lg w-52 outline-none bg-transparent text-white' type="text" name="name" id="name" />
                    </div>
                    <div className='flex text-[#0A84FF] flex-col'>
                        <label htmlFor="email" className='text-2xl font-semibold'>Email :</label>
                        <input className=' border-white border-2 px-3 py-1 rounded-lg w-52 outline-none bg-transparent text-white' type="email" name="email" id="email" />
                    </div>
                    <div className='flex select-none text-[#0A84FF] flex-col'>
                        <label htmlFor="password" className='text-2xl font-semibold'>Password :</label>
                        <div className='flex gap-2'>
                            <input className=' border-white border-2 px-3 py-1 select-none rounded-lg w-52 outline-none bg-transparent text-white' type={`${visble ? "text" : "password"}`} />
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
    )
}

export default page