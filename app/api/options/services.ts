import mongoose, { isValidObjectId } from "mongoose";
import { Option } from "@/lib/types/option";
import OptionModel from "./model";

export interface PaginatedOptionsResponse {
  options: Option[] | Option | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface OptionQueryFilters {
  _id?: mongoose.Types.ObjectId;
  name?: string;
  category?: string;
  values?: string[];
  isEditable?: boolean;
  lastUpdated?: Date | { $gte?: Date; $lte?: Date };
}

export const getOptions = async (
  filters: OptionQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedOptionsResponse> => {
  const query = buildQueryFromFilters(filters);
  let options: Option | Option[] | null;

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  options = await OptionModel.find(query).skip(skip).limit(limit).lean();

  const total = await OptionModel.countDocuments(query);

  return {
    options,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };

  // Creating a query object from the filters
  function buildQueryFromFilters(
    params: OptionQueryFilters
  ): Record<string, any> {
    const filters: OptionQueryFilters = {};

    if (params.name) filters.name = params.name as string;

    if (params.category) filters.category = params.category as string;

    if (params.values) filters.values = params.values as string[];

    if (params.isEditable)
      filters.isEditable = params.isEditable + "" === "true";

    if (params.lastUpdated) {
      filters.lastUpdated = {
        $gte: params.lastUpdated as Date,
      };
    }

    if (params._id) {
      if (isValidObjectId(params._id))
        filters._id = new mongoose.Types.ObjectId(params._id);
    }

    return filters;
  }
};
