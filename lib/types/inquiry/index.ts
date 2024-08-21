import mongoose from "mongoose";
import { InquiryType } from "../common";

export interface Inquiry extends Document {
    _id: mongoose.Types.ObjectId;
    type: InquiryType;
    name: string;
    phone: string;
    email: string;
    details: string;
    status: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    anonymous: boolean;
    postedBy: mongoose.Types.ObjectId;
} 
