import { InquiryType } from "@/lib/types/common";
import { Inquiry } from "@/lib/types/inquiry";
import mongoose, { isValidObjectId } from "mongoose";
import InquiryModel from "./model";

export interface PaginatedInquiriesResponse {
  inquiries: Inquiry[] | Inquiry | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface InquiryQueryFilters {
  _id?: mongoose.Types.ObjectId;
  type?: InquiryType;
  name?: string;
  phone?: string;
  email?: string;
  details?: string;
  status?: string;
  isDeleted?: boolean;
  createdAt?: Date | { $gte?: Date; $lte?: Date };
  updatedAt?: Date | { $gte?: Date; $lte?: Date };
  anonymous?: boolean;
  postedBy?: mongoose.Types.ObjectId;
}

export const getInquiries = async (
  filters: InquiryQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedInquiriesResponse> => {
  const query = buildQueryFromFilters(filters);
  let inquiries: Inquiry | Inquiry[] | null;

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  inquiries = await InquiryModel.find(query).skip(skip).limit(limit).lean();

  const total = await InquiryModel.countDocuments(query);

  return {
    inquiries,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };

  // Creating a query object from the filters
  function buildQueryFromFilters(
    params: InquiryQueryFilters
  ): Record<string, any> {
    const filters: InquiryQueryFilters = {};
    if (params._id) {
      if (isValidObjectId(params._id))
        filters._id = new mongoose.Types.ObjectId(params._id);
    }

    if (params.type) filters.type = params.type as InquiryType;

    if (params.name) filters.name = params.name as string;

    if (params.phone) filters.phone = params.phone as string;

    if (params.email) filters.email = params.email as string;

    if (params.details) filters.details = params.details as string;

    if (params.status) filters.status = params.status as string;

    if (params.isDeleted) filters.isDeleted = params.isDeleted + "" === "true";

    if (params.anonymous) filters.anonymous = params.anonymous + "" === "true";

    if (params.postedBy)
      filters.postedBy = new mongoose.Types.ObjectId(
        params.postedBy
      ) as mongoose.Types.ObjectId;

    if (params.createdAt) {
      filters.createdAt = {
        $gte: new Date(params.createdAt as Date),
      };
    }
    if (params.updatedAt) {
      filters.updatedAt = {
        $gte: new Date(params.updatedAt as Date),
      };
    }

    return filters;
  }
};
