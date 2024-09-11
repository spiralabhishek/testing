// export interface CreateCategoryRequest {
//     name: string;
//     image: string;
//     description: string;
// }

import mongoose from "mongoose";

// export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> { }

export interface Category extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
  description: string;
  isDeleted: boolean;
}
