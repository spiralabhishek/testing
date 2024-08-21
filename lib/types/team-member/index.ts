import mongoose from "mongoose";

export interface TeamMember extends Document {
    _id: mongoose.Types.ObjectId;
    image: string;
    fullName: string;
    position: string;
    aboutMe: string;
    phone: string;
    postedBy: mongoose.Types.ObjectId;
}