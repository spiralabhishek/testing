import mongoose, { isValidObjectId } from "mongoose";
import { Review } from "@/lib/types/review";
import ReviewModel from "./model";

export interface PaginatedReviewsResponse {
  reviews: Review[] | Review | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ReviewQueryFilters {
  _id?: mongoose.Types.ObjectId;
  rating?: number;
  comment?: string;
  confirmed?: boolean;
  createdAt?:
    | Date
    | {
        $gte?: Date;
      };
  professional?: mongoose.Types.ObjectId;
  customer?: mongoose.Types.ObjectId;
}

export const getReviews = async (
  filters: ReviewQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedReviewsResponse> => {
  const query = buildQueryFromFilters(filters);
  let reviews: Review | Review[] | null;

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  reviews = await ReviewModel.find(query).skip(skip).limit(limit).lean();

  const total = await ReviewModel.countDocuments(query);

  return {
    reviews,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };

  // Creating a query object from the filters
  function buildQueryFromFilters(
    params: ReviewQueryFilters
  ): Record<string, any> {
    const filters: ReviewQueryFilters = {};
    if (params._id) {
      if (isValidObjectId(params._id))
        filters._id = new mongoose.Types.ObjectId(params._id);
    }
    if (params.rating) filters.rating = params.rating as number;
    if (params.comment) filters.comment = params.comment as string;
    if (params.confirmed) filters.confirmed = params.confirmed + "" === "true";
    if (params.createdAt)
      filters.createdAt = {
        $gte: params.createdAt as Date,
      };

    if (params.professional && isValidObjectId(params.professional))
      filters.professional = new mongoose.Types.ObjectId(
        params.professional
      ) as mongoose.Types.ObjectId;
    if (params.customer && isValidObjectId(params.customer))
      filters.customer = new mongoose.Types.ObjectId(
        params.customer
      ) as mongoose.Types.ObjectId;
    return filters;
  }
};
