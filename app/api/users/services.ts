import mongoose, { isValidObjectId } from "mongoose";
import { BaseUser, CustomerUser, ProfessionalUser } from "@/lib/types/user";

import InquiryModel from "../inquiries/model";
import { UserType } from "@/lib/types/common";
import UserModel from "./model";

export interface PaginatedUsersResponse {
  users: BaseUser[] | BaseUser | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface UserQueryFilters {
  _id?: mongoose.Types.ObjectId;
  type?: UserType;
  name?: string;
  phone?: string;
  email?: string;
  isDeleted?: boolean;
  inquiries?: {
    $in?: mongoose.Types.ObjectId[];
  };
}

export const getUsers = async (
  filters: UserQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedUsersResponse> => {
  const query = buildQueryFromFilters(filters);
  let users: BaseUser | BaseUser[] | null;

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  users = await UserModel.find(query)
    .populate({
      path: "inquiries",
      model: InquiryModel,
    })
    .skip(skip)
    .limit(limit);

  const total = await UserModel.countDocuments(query);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };

  // Creating a query object from the filters
  function buildQueryFromFilters(
    params: UserQueryFilters
  ): Record<string, any> {
    const filters: UserQueryFilters = {};
    if (params._id)
      if (isValidObjectId(params._id))
        filters._id = new mongoose.Types.ObjectId(params._id);

    if (params.type && params.type in UserType)
      filters.type = params.type as UserType;

    if (params.name) filters.name = params.name as string;

    if (params.phone) filters.phone = params.phone as string;

    if (params.email) filters.email = params.email as string;

    if (params.isDeleted) filters.isDeleted = params.isDeleted as boolean;

    if (
      params.inquiries &&
      Array.isArray(params.inquiries) &&
      params.inquiries.length > 0
    ) {
      const inqIds = params.inquiries
        .map((inqId) => {
          if (isValidObjectId(inqId))
            // Might not work (new mongoose.Types.ObjectId(inqId) function is deprecated, trying an alternative function)
            return mongoose.Types.ObjectId.createFromTime(inqId);
        })
        .filter((id) => id !== undefined);

      filters.inquiries = { $in: inqIds };
    }

    return filters;
  }
};
