import { Schema , models , model } from "mongoose";

const orderSchema = new Schema(
    {
        customer:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        products:{
            type:Array
        }
    },
    {
        timestamps:true,
    }
)

const ORDER = models.ORDER || model("ORDER",orderSchema)
export default ORDER