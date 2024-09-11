import mongoose, { isValidObjectId } from "mongoose";
import { BasePost } from "@/lib/types/post";
import PostModel from "./model";
import { calculateRadians } from "@/utils/geoUtils";
import { GeoQueryParams, ILocation } from "@/lib/types/common";

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

function isValidCoordinate(coord: number): boolean {
    return typeof coord === 'number' && !isNaN(coord) && isFinite(coord);
}

function isValidLatitude(lat: number): boolean {
    return isValidCoordinate(lat) && lat >= -90 && lat <= 90;
}

function isValidLongitude(lon: number): boolean {
    return isValidCoordinate(lon) && lon >= -180 && lon <= 180;
}

function isValidRadius(radius: number): boolean {
    return typeof radius === 'number' && !isNaN(radius) && radius > 0;
}

export const getPosts = async (
    filters: PostQueryFilters & GeoQueryParams & ILocation & { page?: number; limit?: number }
): Promise<PaginatedPostsResponse> => {
    try {
        const query = buildQueryFromFilters(filters);

        let posts: BasePost[] | BasePost | any;

        if (filters.longitude !== undefined && filters.latitude !== undefined) {
            if (!isValidLongitude(Number(filters.longitude))) {
                throw new Error('Invalid longitude. Must be between -180 and 180.');
            }
            if (!isValidLatitude(Number(filters.latitude))) {
                throw new Error('Invalid latitude. Must be between -90 and 90.');
            }
            const radiusKm = filters.radiusKm || 10;
            if (!isValidRadius(Number(radiusKm))) {
                throw new Error('Invalid radius. Must be a positive number.');
            }

            query['Location.coordinates'] = {
                $geoWithin: {
                    $centerSphere: [
                        [filters.longitude, filters.latitude],
                        calculateRadians(radiusKm)
                    ]
                }
            };
        }

        const page = Math.max(1, filters.page || 1);
        const limit = Math.max(1, Math.min(100, filters.limit || 10));
        const skip = (page - 1) * limit;

        posts = await PostModel.find(query).skip(skip).limit(limit).lean().exec();

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
    } catch (error) {
        console.error('Error in getPosts:', error);
        throw error;
    }
};

// Creating a query object from the filters
function buildQueryFromFilters(
    params: PostQueryFilters & GeoQueryParams & ILocation
): Record<string, any> {
    const filters: Record<string, any> = {};

    if (params.type) filters.type = params.type as string;

    if (params.title) filters.title = params.title as string;

    if (params.phone) filters.phone = params.phone as string;

    if (params.price) filters.price = params.price as number;

    if (params.isActive !== undefined) filters.isActive = params.isActive as boolean;

    if (params.board && isValidObjectId(params.board))
        filters.board = new mongoose.Types.ObjectId(params.board);

    if (params.postedBy && isValidObjectId(params.postedBy))
        filters.postedBy = new mongoose.Types.ObjectId(params.postedBy);

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

    if (params._id && isValidObjectId(params._id))
        filters._id = new mongoose.Types.ObjectId(params._id);

    if (params.city) filters['Location.city'] = params.city;
    if (params.country) filters['Location.country'] = params.country;

    return filters;
}
