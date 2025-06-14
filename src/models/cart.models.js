import { Schema, models, model } from "mongoose";

const cartSchema = new Schema(
    {
        userid: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product',require:true },
                title: String,
                price: Number,
                quantity: Number,
                image: String,
            }
        ],
        totalPrice :{
            type:Number,
            require:true,
        },
        totalProduct:{
            type:Number,
            require:true,
        }
    },
    {
        timestamps: true,
    }
)

const Cart  = models.Cart || model("Cart",cartSchema)
export default Cart