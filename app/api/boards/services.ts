import mongoose, { isValidObjectId } from "mongoose";
import { Board } from "@/lib/types/board";
import BoardModel from "./model";

export interface PaginatedBoardsResponse {
  boards: Board[] | Board | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface BoardQueryFilters {
  _id?: mongoose.Types.ObjectId;
  name?: string;
  title?: string;
  description?: string;
  posts?: mongoose.Types.ObjectId[];
  image?: string;
}

export const getBoards = async (
  filters: BoardQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedBoardsResponse> => {
  const query = buildQueryFromFilters(filters);
  let boards: Board | Board[] | null;

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  boards = await BoardModel.find(query).skip(skip).limit(limit).lean();

  const total = await BoardModel.countDocuments(query);

  return {
    boards,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };

  // Creating a query object from the filters
  function buildQueryFromFilters(
    params: BoardQueryFilters
  ): Record<string, any> {
    const filters: BoardQueryFilters = {};

    // Filter by posts isn't implemented here
    // Got to discuss with Keshet if it's needed or not
    if (params._id) {
      if (isValidObjectId(params._id))
        filters._id = new mongoose.Types.ObjectId(params._id);
    }

    if (params.name) filters.name = params.name as string;
    if (params.title) filters.title = params.title as string;
    if (params.description) filters.description = params.description as string;
    if (params.image) filters.image = params.image as string;

    return filters;
  }
};
