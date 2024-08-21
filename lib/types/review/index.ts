import mongoose from "mongoose";
import { Category } from "../category";

export interface Review extends Document {
    _id: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    confirmed: boolean;
    service : Category;
    createdAt: Date;
    professional: mongoose.Types.ObjectId;
    customer: mongoose.Types.ObjectId;
}