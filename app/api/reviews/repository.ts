import { Review } from '@/lib/types/review';
import models from '@/models';

const { ReviewModel } = models;

export const createReview = async (reviewData: Review) => {
  const review = new ReviewModel(reviewData);
  return await review.save();
};

export const getReviewById = async (id: string) => {
  return await ReviewModel.findById(id);
};

export const getAllReviews = async () => {
  return await ReviewModel.find();
};

export const updateReview = async (id: string, updateData: Partial<Review>) => {
  return await ReviewModel.findByIdAndUpdate(id, updateData);
};

export const deleteReview = async (id: string) => {
  return await ReviewModel.findByIdAndDelete(id);
};
