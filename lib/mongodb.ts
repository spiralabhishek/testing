import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = "mongodb+srv://abhishekspiral:tZhQAJr1IMprR64V@pro-card.7ii4e.mongodb.net/?retryWrites=true&w=majority&appName=pro-card";

interface MongooseConn {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;

    cached.promise =
        cached.promise ||
        mongoose.connect(MONGODB_URL, {
            dbName: "pro-card",
            bufferCommands: false,
            connectTimeoutMS: 30000,
        });

    cached.conn = await cached.promise;

    return cached.conn;
};

export default dbConnect;