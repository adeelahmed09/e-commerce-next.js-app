import ConnectDB from "@/libs/ConnectDB";
import User from "@/models/user.models";
import Cart from "@/models/cart.models";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { products,totalProduct,totalPrice, userid, } =await req.json();
    console.log(totalProduct);
    try {
        if(!products){
            return NextResponse.json({ error: "Products is not present" }, {success:false}, { status: 500 })
        }
        await ConnectDB();
        const isCartExisted = await Cart.findOne({ userid })
        if (isCartExisted) {
           isCartExisted.products = products
           isCartExisted.totalProdcut = totalProduct
           isCartExisted.totalPrice = totalPrice

           await isCartExisted.save()
           const newCart = await Cart.findById(isCartExisted._id)
           console.log(newCart);
           return NextResponse.json({ success:true },{cart:isCartExisted}, { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, {success:false}, { status: 500 })
    }
}