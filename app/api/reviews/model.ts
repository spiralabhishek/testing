import { Category } from '@/lib/types/category';
import { Review } from '@/lib/types/review';
import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema<Category>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

const ReviewSchema = new Schema<Review>({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    service: { type: CategorySchema },
    confirmed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    professional: { type: Schema.Types.ObjectId, ref: 'Professional', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
});

const ReviewModel = mongoose.models.Reviews || mongoose.model<Review>('Reviews', ReviewSchema);

export default ReviewModel