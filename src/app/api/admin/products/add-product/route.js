import { authOptions } from "../../../auth/[...nextauth]/options.js";
import { NextResponse } from "next/server";
import Product from "@/models/product.model";
import ConnectDB from "@/libs/ConnectDB";   
import { getServerSession } from "next-auth";


export async function POST(req){
    const session = await getServerSession(authOptions);
    if(session?.user?.role !== "admin"){
        return NextResponse.json({error:"You are not Authorized"},{status:401});
    }
    try {
        const {title,desc,stock,image,publish,price} = await req.json();
        console.log(title,stock,image,publish,price);
        if(!title || !desc || !image ){
            return NextResponse.json({error:"All fields are required!!"},{status:401});
        }
        await ConnectDB();
        const isProductTitleExisted = await Product.findOne({title});
        if(isProductTitleExisted){
            return NextResponse.json({error:"Product already existed with this title"},{status:401});
        }
        const product = await Product.create({
            title,
            stock,
            desc,
            publish,
            image,
            price
        })
        if(!product){
            return NextResponse.json({error:"Something went wrong during creating product || Try Again !!"},{status:502});
        }
        const createdProduct = await Product.findById(product._id);
        if(!createdProduct){
            return NextResponse.json({error:"Something went wrong during creating product || Try Again !!"},{status:502});
        }
        return NextResponse.json({product:createdProduct},{status:200});
    } catch (error) {
         return NextResponse.json({error:error.message},{status:500});
    }
}