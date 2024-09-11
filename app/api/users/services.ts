import mongoose, { Document, FilterQuery } from 'mongoose';
import { BaseUser, CustomerUser, ProfessionalUser } from "@/lib/types/user";
import InquiryModel from "../inquiries/model";
import { UserType } from "@/lib/types/common";
import UserModel from "./model";
import dbConnect from "@/lib/mongodb";

await dbConnect();

export interface PaginatedUsersResponse {
  users: BaseUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface UserQueryFilters {
  _id?: string | mongoose.Types.ObjectId;
  type?: UserType;
  name?: string;
  phone?: string;
  email?: string;
  isDeleted?: boolean;
  inquiries?: mongoose.Types.ObjectId[];
}

export const countProfessionalsUsersByCategory = async (
  categoryId: mongoose.Types.ObjectId
) => {
  try {
    const count = await UserModel.countDocuments({
      type: "professional",
      categories: { $in: [categoryId] },
    });

    return count;
  } catch (error) {
    console.error("Error counting users by category:", error);
    return null;
  }
};

export const getUsers = async (
  filters: UserQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedUsersResponse> => {
  const query = buildQueryFromFilters(filters);
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  const users = await UserModel.find(query)
    .select("-password")
    .populate({
      path: "inquiries",
      model: InquiryModel,
    })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  const total = await UserModel.countDocuments(query);

  return {
    users: users as BaseUser[],
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const buildQueryFromFilters = (params: UserQueryFilters): FilterQuery<BaseUser> => {
  const filters: FilterQuery<BaseUser> = {};
  
  if (params._id) filters._id = new mongoose.Types.ObjectId(params._id);
  if (params.type) filters.type = params.type;
  if (params.name) filters.name = params.name;
  if (params.phone) filters.phone = params.phone;
  if (params.email) filters.email = params.email;
  if (params.isDeleted !== undefined) filters.isDeleted = params.isDeleted;
  if (params.inquiries && params.inquiries.length > 0) {
    filters.inquiries = { $in: params.inquiries.map(id => new mongoose.Types.ObjectId(id)) };
  }

  return filters;
};