import ConnectDB from "@/libs/ConnectDB";
import Admin from "@/models/admin.models";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

const response = NextResponse
export async function POST(req) {
    try {
        const {name,email,password,files} =await req.json();
        console.log(name,email,files,password);
        if(!name || !email || !password || !files){
            return response.json({error:"All Field Are Required!!"},{status:400});
        }
        await ConnectDB();
        const isUserNameExisted = await User.findOne({name});
        if(isUserNameExisted){
            return response.json({error:"User Name Is Existed Already"},{status:400});
        }
         const isUserEmailExisted = await User.findOne({email});
        if(isUserEmailExisted){
            return response.json({error:"User Email Is Existed Already"},{status:400});
        }
        const isAdminEmail = await Admin.findOne({email});
        const isAdminName = await Admin.findOne({name});
        if(isAdminEmail){
            return response.json({error:"YOU CAN NOT USE THIS EMAIL!! 501"},{status:400});
        }
        if(isAdminName){
            return response.json({error:"YOU CAN NOT USE THIS NAME!! 501"},{status:400});
        }
        const role= "user"
        const avatar = files
        const user = await User.create({
            name,
            password,
            email,
            role,
            avatar
        })
        const createdUser = await User.findById(user._id)
        if(!createdUser){
            return response.json({error:"SomeThing Went Worng During Creating User Please Try Agian"},{status:500});
        }
        return response.json({user:createdUser},{status:200});
    } catch (error) {
        console.log(error);
        return response.json({error:error},{status:500});
    }
}