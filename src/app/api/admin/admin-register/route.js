import ConnectDB from "@/libs/ConnectDB";
import Admin from "@/models/admin.models";
import User from "@/models/user.models";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
const response = NextResponse
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== "admin") {
            return NextResponse.json({ error: "You are not Authorized" }, { status: 402 });
        }
        const { name, email, password, files } = await req.json();
        console.log(name, email, files, password);
        if (!name || !email || !password || !files) {
            return response.json({ error: "All Field Are Required!!" }, { status: 400 });
        }
        await ConnectDB();
        const isUserNameExisted = await User.findOne({ name });
        if (isUserNameExisted) {
            return response.json({ error: "User Name Is Existed Already" }, { status: 400 });
        }
        const isUserEmailExisted = await User.findOne({ email });
        if (isUserEmailExisted) {
            return response.json({ error: "User Email Is Existed Already" }, { status: 400 });
        }
        const isAdminEmail = await Admin.findOne({ email });
        const isAdminName = await Admin.findOne({ name });
        if (isAdminEmail) {
            return response.json({ error: "YOU CAN NOT USE THIS EMAIL!! 501" }, { status: 400 });
        }
        if (isAdminName) {
            return response.json({ error: "YOU CAN NOT USE THIS NAME!! 501" }, { status: 400 });
        }
        const role = "user"
        const avatar = files
        const admin = await Admin.create({
            name,
            password,
            email,
            role,
            avatar
        })
        const createdAdmin = await Admin.findById(admin._id)
        if (!createdAdmin) {
            return response.json({ error: "SomeThing Went Worng During Creating User Please Try Agian" }, { status: 500 });
        }
        return response.json({ user: createdAdmin }, { status: 200 });
    } catch (error) {
        console.log(error);
        return response.json({ error: error }, { status: 500 });
    }
}