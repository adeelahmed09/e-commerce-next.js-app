import { Schema, models, model } from "mongoose";

const productSchema = new Schema(
    {
        title: {
            required: true,
            type: String,
            unique: true
        },
        desc: {
            required: true,
            type: String,
        },
        stock: {
            required: true,
            type: Number,
            min: 0,
        },
        publish: {
            type: Boolean,
            required: true,
            default: false,
        },
        image: {
            type: String,
            required: true
        },
        price: {
            required: true,
            type: Number,
            min: 0,
        }
    },
    {
        timestamps: true
    }
)

const Product = models.Product || model("Product", productSchema);
export default Product