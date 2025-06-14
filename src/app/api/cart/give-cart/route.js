import ConnectDB from "@/libs/ConnectDB";
import Cart from "@/models/cart.models";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {userid} = await req.json();
    try {
        await ConnectDB()
        const cart = await Cart.findOne({userid});
        return NextResponse.json({cart:cart},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:error},{status:500});
    }

}