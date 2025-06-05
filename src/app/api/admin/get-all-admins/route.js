import ConnectDB from "@/libs/ConnectDB";
import Admin from "@/models/admin.models";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(authOptions);
    if(session?.user?.role !== "admin"){
        return NextResponse.json({error:"You are not Authorized"},{status:402});
    }
    try {
        await ConnectDB();
        const allAdmins = await Admin.find().select("-password");
        if(!allAdmins){
            return NextResponse.json({error:"Something went worng during fetching Admin Data"},{status:502});
        }
        return NextResponse.json({admins:allAdmins},{status:200});
    } catch (error) {
         return NextResponse.json({error:error},{status:502});
    }
}