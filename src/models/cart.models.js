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
                
                _id: { type: Schema.Types.ObjectId, ref: 'Product',require:true },
                title:  { type: String,require:true },
                price: { type: Number,require:true },
                quantity: { type: Number,require:true },
                image: { type: String,require:true },
                
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