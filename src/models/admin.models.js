import { Schema,model,models } from "mongoose";
import bcrypt from "bcryptjs"
const adminSchema = new Schema(
    {
        name:{
            required:true,
            type:String
        },
        email:{
            required:true,
            type:String,
            unique:true,
        },
        password:{
            required:true,
            type:String,
        },
        avatar:{
            type:String
        },
        phoneNumber:{
            type:Number
        },
        role:{
            required:true,
            type:String,
        }
    },
    {
        timestamps:true
    }
)
adminSchema.pre("save",async function (next) {
    if(this.isModified("password")){
         this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

const Admin = models.Admin || model("Admin",adminSchema)
export default Admin
