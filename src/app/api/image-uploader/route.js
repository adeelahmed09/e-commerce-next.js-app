import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

 cloudinary.config({ 
        cloud_name: process.env.CLOUDNIARY_NAME, 
        api_key:process.env.CLOUDNIARY_API , 
        api_secret:process.env.CLOUDNIARY_SECERT
    });
export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file")
        if (!file) {
            return NextResponse.json({ error: "File not Found" }, { status: 400 })
        }
        const bites = await file.arrayBuffer();
        const buffer = Buffer.from(bites)

        const result = await new Promise((resolve ,reject)=>{
            const upload = cloudinary.uploader.upload_stream(
                (error,resutl)=>{
                    if(error) reject(error);
                    else resolve(resutl)
                }
            )
            upload.end(buffer)
        })
        return NextResponse.json({success : result.url},{status:200});
    } catch (error) {
        console.log("Upload Image Fieled :",error);
        return NextResponse.json({error:`upload image failed ${error}`},{status:500})
    }
}