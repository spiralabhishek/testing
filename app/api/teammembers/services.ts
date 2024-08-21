import mongoose, { isValidObjectId } from "mongoose";
import { TeamMember } from "@/lib/types/team-member";
import TeamMemberModel from "./model";

export interface PaginatedTeamMembersResponse {
  teamMembers: TeamMember[] | TeamMember | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface TeamMemberQueryFilters {
  _id?: mongoose.Types.ObjectId;
  image?: string;
  fullName?: string;
  position?: string;
  aboutMe?: string;
  phone?: string;
  postedBy?: mongoose.Types.ObjectId;
}

export const getTeamMembers = async (
  filters: TeamMemberQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedTeamMembersResponse> => {
  const query = buildQueryFromFilters(filters);
  let teamMembers: TeamMember | TeamMember[] | null;

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  teamMembers = await TeamMemberModel.find(query)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await TeamMemberModel.countDocuments(query);

  return {
    teamMembers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };

  // Creating a query object from the filters
  function buildQueryFromFilters(
    params: TeamMemberQueryFilters
  ): Record<string, any> {
    const filters: TeamMemberQueryFilters = {};

    if (params._id) {
      if (isValidObjectId(params._id))
        filters._id = new mongoose.Types.ObjectId(params._id);
    }

    if (params.image) filters.image = params.image as string;
    if (params.fullName) filters.fullName = params.fullName as string;
    if (params.position) filters.position = params.position as string;
    if (params.aboutMe) filters.aboutMe = params.aboutMe as string;
    if (params.phone) filters.phone = params.phone as string;
    if (params.postedBy) {
      if (isValidObjectId(params.postedBy))
        filters.postedBy = new mongoose.Types.ObjectId(params.postedBy);
    }


    return filters;
  }
};
