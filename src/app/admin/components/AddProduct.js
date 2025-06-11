"use client"
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

function AddProduct() {
    const noImageURL = "https://res.cloudinary.com/dsgftijpe/image/upload/v1749162861/cart_img_p81ksi.jpg"
    const [imgUrl, setImgUrl] = useState(noImageURL)
    const [rawFormData, setRawFormData] = useState(
        {
            title: "",
            desc: "",
            stock: 0,
            publish: false,
            image: "",
            price: 0,
        }
    )
    const [process, setProcess] = useState(false)
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

    const onChangeTextHandler = (e) => {
        const { value, name } = e.target
        setRawFormData({ ...rawFormData, [name]: value })
        console.log(rawFormData);
        console.log(typeof value);

    }
    const onChangeNumberHandler = (e) => {
        const { value, name } = e.target
        setRawFormData({ ...rawFormData, [name]: value })
        console.log(rawFormData);
    }
    const onChangeCheckHandler = (e) => {
        const { checked, name } = e.target
        setRawFormData({ ...rawFormData, [name]: checked })
    }
    const onChangeFileHandler = (e) => {
        const { files, name } = e.target
        if (files[0].size > 2. * 1024 * 1024) {
            alert("Image must be under 2MB")
            e.target.value = ""
            setRawFormData({ ...rawFormData, image: "" })
            setImgUrl(noImageURL)
            return
        }
        if ((files[0].type !== "image/png" && files[0].type !== "image/jpeg" && files[0].type !== "image/webp")) {
            alert("Please Add Correct Image type")
            setImgUrl(noImageURL)
            setRawFormData({ ...rawFormData, image: "" })
            e.target.value = ""
            return
        }
        setRawFormData({ ...rawFormData, image: files[0] })
        const fileUrl = URL.createObjectURL(files[0])
        setImgUrl(fileUrl)
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        setProcess(true)
        formData.append("file", rawFormData.image)
        try {
            const imageUpload = await axios.post("/api/image-uploader", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            console.log(imageUpload);
            if (imageUpload.data.success) {
                try {
                    const result = await axios.post("/api/admin/products/add-product",
                        {
                            title: rawFormData.title,
                            desc: rawFormData.desc,
                            publish: rawFormData.publish,
                            image: imageUpload.data.success,
                            stock: rawFormData.stock,
                            price: rawFormData.price
                        }
                    )
                    if (result.data.product) {
                        alert("Successfully Created");
                        setImgUrl(noImageURL)
                        setProcess(false)
                        setRawFormData(
                            {
                                title: "",
                                desc: "",
                                stock: 0,
                                publish: false,
                                image: "",
                                price: 0,
                            }
                        )
                        e.target.reset();
                        return
                    }
                } catch (error) {
                    console.log(error);
                    alert(error.response.data.error)
                    setImgUrl(noImageURL)
                    setProcess(false)
                    setRawFormData(
                        {
                            title: "",
                            desc: "",
                            stock: 0,
                            publish: false,
                            image: "",
                            price: 0,
                        }
                    )
                    e.target.reset();
                }
            }
        } catch (error) {
            console.log(error);
            alert("Something Went Wrong During Image Uploading Please Try Again!!")
            setImgUrl(noImageURL)
            setProcess(false)
            e.target.reset();
            setRawFormData(
                {
                    title: "",
                    desc: "",
                    stock: 0,
                    publish: false,
                    image: "",
                    price: 0,
                }
            )
            return
        }
    }
    return (
        <>

            <div className='w-full flex relative flex-col items-center'>
                <div ref={loaderBack} className='bg-white/10 hidden backdrop-blur-md w-full h-full rounded  absolute  items-center justify-center right-0'>
                    <div ref={loader} className=' w-10 h-10 border-t-4 border-[#0A84FF] rounded-full'>

                    </div>
                </div>
                <h1 className='lg:text-2xl text-xl font-[space] text-white'>Add Product</h1>
                <div>
                    <form onSubmit={onSubmitHandler} className='w-full grid sm:grid-cols-2 items-center gap-9 border-2 border-gray-700 py-4 sm:px-7 px-2 rounded-md'>
                        <div className='flex  flex-col gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="title" className='text-lg font-semibold font-[space] text-white'>Title :</label>
                                <input required onChange={onChangeTextHandler} type="text" name='title' value={rawFormData.title} id='title' className='w-[250px] py-1 px-3 outline-none border-2 border-gray-700 rounded-md bg-transparent text-white' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="desc" className='text-lg font-semibold font-[space] text-white'>Description :</label>
                                <textarea required onChange={onChangeTextHandler} className=' py-1 px-3 outline-none border-2 border-gray-700 rounded-md bg-transparent text-white' value={rawFormData.desc} id="desc" name="desc" rows="4" cols="30"></textarea>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="stock" className='text-lg font-semibold font-[space] text-white'>Stock :</label>
                                <input required type="number" onChange={onChangeNumberHandler} id='stock' value={rawFormData.stock} name='stock' className='w-[250px] py-1 px-3 outline-none border-2 border-gray-700 rounded-md bg-transparent text-white' />
                            </div>
                            <div className='flex gap-2 '>
                                <label htmlFor="publish" className='text-lg font-semibold font-[space] text-white'>Publish :</label>
                                <input required type="checkbox" onChange={onChangeCheckHandler} name='publish' checked={rawFormData.publish} id='publish' className='w-4 outline-none ' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="price" className='text-lg font-semibold font-[space] text-white'>Price :</label>
                                <input required type="number" id='price' onChange={onChangeNumberHandler} name='price' value={rawFormData.price} className='w-[250px] py-1 px-3 outline-none border-2 border-gray-700 rounded-md bg-transparent text-white' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center w-fit h-fit'>
                            <img src={imgUrl} className='w-[250px] h-[250px] object-center object-cover rounded-lg' alt="" />
                            <input required type="file" onChange={onChangeFileHandler} className='text-white w-[235px] font-[space]' />
                        </div>
                        <div className='w-full flex justify-center items-center gap-2 sm:col-span-2 '>
                            <button type='submit' className='text-white bg-green-500 rounded-md py-1 px-2 '>Submit</button>
                            <button className='text-white bg-red-500 rounded-md py-1 px-2 '>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct
