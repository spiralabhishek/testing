// lib/mongodb.ts
import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    console.log("Please define the MONGODB_URI environment variable inside .env.local");

    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

interface Cached {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: Cached;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                dbName: "pro-card",
                bufferCommands: false,
                connectTimeoutMS: 30000,
            })
            .then((mongoose) => {
                console.error('Database has been connetced');
                return mongoose;
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;