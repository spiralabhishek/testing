import mongoose, { isValidObjectId } from "mongoose";

import { Category } from "@/lib/types/category";
import CategoryModel from "./model";

export interface PaginatedCategoriesResponse {
  categories: Category[] | Category | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface CategoryQueryFilters {
    _id?: mongoose.Types.ObjectId;
    name?: string;
    image?: string;
    description?: string;
}
export const getCategories = async (
  filters: CategoryQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedCategoriesResponse> => {
  const query = buildQueryFromFilters(filters);
  let categories: Category | Category[] | null;

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  categories = await CategoryModel.find(query).skip(skip).limit(limit).lean();

  const total = await CategoryModel.countDocuments(query);

  return {
    categories,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };

  // Creating a query object from the filters
  function buildQueryFromFilters(
    params: CategoryQueryFilters
  ): Record<string, any> {
    const filters: CategoryQueryFilters = {};
        if (params.name) filters.name = params.name as string;
        if (params.image) filters.image = params.image as string;
        if (params.description) filters.description = params.description as string;
        if (params._id) {
            if (isValidObjectId(params._id))
                filters._id = new mongoose.Types.ObjectId(params._id);
        }
    return filters;
  }
};
