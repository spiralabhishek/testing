import mongoose, { isValidObjectId } from "mongoose";
import { Category } from "@/lib/types/category";
import CategoryModel from "./model";
import UserModel from "../users/model";
import dbConnect from "@/lib/mongodb";
import { checkUserRole } from "@/lib/auth";

await dbConnect();

export interface PaginatedResponse<T> {
  categories: T;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ParsedCategory {
  _id: string;
  name: string;
  isDeleted: boolean;
  userCount: number;
}

export interface CategoryFilters {
  _id?: mongoose.Types.ObjectId;
  name?: string;
  image?: string;
  description?: string;
  isDeleted?: boolean;
}

export async function toggleCategory(categoryId: string, disable: boolean) {
  const { clerkUserRole } = await checkUserRole(["Admin"]);
  if (clerkUserRole !== "Admin") throw new Error("Unauthorized");

  if (!categoryId || !isValidObjectId(categoryId)) throw new Error("Invalid category ID");

  const cat = await CategoryModel.findById(categoryId);
  if (!cat) throw new Error("Category not found");

  await CategoryModel.findByIdAndUpdate(categoryId, { isDeleted: !disable });
  return true;
}

export const getCategories = async (
  filters: CategoryFilters & { page?: number; limit?: number }
): Promise<PaginatedResponse<Category[]>> => {
  const query = buildQuery(filters);
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

    const categories = await CategoryModel.find(query).skip(skip).limit(limit).lean() as Category[];
    const total = await CategoryModel.countDocuments(query);

  return {
    categories: categories,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export function buildQuery(params: CategoryFilters): Record<string, any> {
  const filters: CategoryFilters = {};
  if (params.isDeleted !== undefined) filters.isDeleted = params.isDeleted;
  if (params.name) filters.name = params.name;
  if (params.image) filters.image = params.image;
  if (params.description) filters.description = params.description;
  if (params._id && isValidObjectId(params._id)) filters._id = new mongoose.Types.ObjectId(params._id);
  return filters;
}

export const getCategoriesWithUsers = async (
  options: { page?: number | string; limit?: number | string; name?: string } = {}
): Promise<PaginatedResponse<ParsedCategory[]>> => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 15;
  const skip = (page - 1) * limit;

  const pipeline: mongoose.PipelineStage[] = [];

  // Add $match stage if name is provided
  if (options.name) {
    pipeline.push({
      $match: {
        name: { $regex: options.name, $options: 'i' } // Case-insensitive search
      }
    });
  }

  pipeline.push(
    {
      $lookup: {
        from: UserModel.collection.name,
        localField: "_id",
        foreignField: "categories",
        as: "users"
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        isDeleted: 1,
        userCount: { $size: "$users" }
      }
    },
    { $skip: skip },
    { $limit: limit }
  );

  const [results, totalCount] = await Promise.all([
    CategoryModel.aggregate(pipeline),
    CategoryModel.aggregate([
      ...(options.name ? [{ $match: { name: { $regex: options.name, $options: 'i' } } }] : []),
      { $count: 'total' }
    ]).then(result => result[0]?.total || 0)
  ]);

  return {
    categories: results,
    pagination: {
      total: totalCount,
      page,
      limit,
      pages: Math.ceil(totalCount / limit),
    }
  };
};
