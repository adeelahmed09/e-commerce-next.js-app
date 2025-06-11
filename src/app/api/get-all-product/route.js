import ConnectDB from "@/libs/ConnectDB";
import Product from "@/models/product.model.js";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await ConnectDB();
        const allProduct = await Product.find()
        if(!allProduct){
            return NextResponse.json({error:"Something went wrong during getting all data"},{status:500})
        }
        return NextResponse.json({products:allProduct},{status:200});
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}
