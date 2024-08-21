import mongoose from "mongoose";

export interface Board extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    title: string;
    description: string;
    posts: mongoose.Types.ObjectId[];
    image: string;
  }