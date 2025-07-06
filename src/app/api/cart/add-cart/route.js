import ConnectDB from "@/libs/ConnectDB";
import User from "@/models/user.models";
import Cart from "@/models/cart.models";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { product, userid, } =await req.json();
    if(!product){
        return NextResponse.json({ error: "Product is not preasent" }, { status: 500 })
    }
    console.log(product,userid);
    const productToAdd = product
    try {
        await ConnectDB();
        const isCartExisted = await Cart.findOne({ userid })
        if (isCartExisted) {
            const existedProduct = isCartExisted?.products.find(
                product => product._id.toString() === productToAdd._id
            )
            if (existedProduct) {
                existedProduct.quantity += product.quantity;
            }
            else {
                isCartExisted.products.push(product);
            }
            isCartExisted.totalProduct += product.quantity;
            isCartExisted.totalPrice += product.price * product.quantity;

            await isCartExisted.save()
            const newCart = await Cart.findById(isCartExisted._id)
            if(!newCart){
                return NextResponse.json({error:"Something went worng during fetching cart"},{status:400})
            }
            return NextResponse.json({cart:newCart},{status:200})
        }
        const newcart = await Cart.create({
            userid: userid,
            products: [product],
            totalProduct: product.quantity,
            totalPrice: product.price * product.quantity
        })
        const cartCreated = await Cart.findById(newcart._id)
        if (cartCreated) {
            return NextResponse.json({ cart: cartCreated }, { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 })
    }
}