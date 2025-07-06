import Cart from "@/models/cart.models";
import ConnectDB from "@/libs/ConnectDB";

export async function POST(req) {
    const {cart_id,quantity,product_id} = await req.json();
    try {
        await ConnectDB();
        const cart = await Cart.findById(cart_id);
        console.log(cart);
        const cart_product = cart.products.find(
            (productToChange)=>{
                productToChange._id === product_id
            }
        )
        if(cart_product){
           cart_product.quantity = quantity;
        }
    } catch (error) {
        
    }
}