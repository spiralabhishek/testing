import mongoose, { isValidObjectId } from "mongoose";
import { BasePost } from "@/lib/types/post";
import PostModel from "./model";

export interface PaginatedPostsResponse {
    posts: BasePost[] | BasePost | null;
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

export interface PostQueryFilters {
    _id?: mongoose.Types.ObjectId;
    type?: string;
    title?: string;
    board?: mongoose.Types.ObjectId;
    phone?: string;
    postedBy?: mongoose.Types.ObjectId;
    createdAt?: Date | { $gte?: Date; $lte?: Date };
    updatedAt?: Date | { $gte?: Date; $lte?: Date };
    isActive?: boolean;
    price?: number;
}

export const getPosts = async (
    filters: PostQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedPostsResponse> => {
    const query = buildQueryFromFilters(filters);
    let posts: BasePost | BasePost[] | null;

    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    posts = await PostModel.find(query).skip(skip).limit(limit).lean();

    const total = await PostModel.countDocuments(query);

    return {
        posts,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };

    // Creating a query object from the filters
    function buildQueryFromFilters(
        params: PostQueryFilters
    ): Record<string, any> {
        const filters: PostQueryFilters = {};

        if (params.type) filters.type = params.type as string;

        if (params.title) filters.title = params.title as string;

        if (params.phone) filters.phone = params.phone as string;

        if (params.price) filters.price = params.price as number;

        if (params.isActive) filters.isActive = params.isActive as boolean;

        if (params.board)
            filters.board = new mongoose.Types.ObjectId(
                params.board
            ) as mongoose.Types.ObjectId;

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

        if (params._id) {
            if (isValidObjectId(params._id))
                filters._id = new mongoose.Types.ObjectId(params._id);
        }

        return filters;
    }
};
