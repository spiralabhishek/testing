import { Category } from '@/lib/types/category';
import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema<Category>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const CategoryModel = mongoose.models.Categories || mongoose.model<Category>('Categories', CategorySchema);

export default CategoryModel