// lib/mongodb.ts
import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//     throw new Error(
//         'Please define the MONGODB_URI environment variable inside .env.local'
//     );
// }
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

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
            .connect(MONGODB_URI)
            .then((mongoose) => {
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