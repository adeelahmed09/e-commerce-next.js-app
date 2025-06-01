import mongoose from "mongoose";
const connection = {}
async function ConnectDB() {
    if(connection?.isConnected){
        console.log("Already Connected To DataBase");
        return
    }
    try {
        const db = await mongoose.connect(process.env.DATABASE_URL || "",{})
        connection.isConnected = db.connections[0].readyState
        console.log(db.connections[0].readyState);
        console.log("DB is connected",db.connections[0].readyState);
    } catch (error) {
        console.log("Err: DataBase Connection Failed :",error);
        process.exit(1)
    }
}
export default ConnectDB