import ConnectDB from "@/libs/ConnectDB";
import Product from "@/models/product.model.js";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {id} = await req.json()
    console.log(id);
    try {
        await ConnectDB();
        const product = await Product.findById(id)
        
        if(!product){
            return NextResponse.json({error:"Something went wrong during getting all data"},{status:500})
        }
        return NextResponse.json({product:product},{status:200});
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}
