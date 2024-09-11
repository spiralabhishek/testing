import mongoose, { isValidObjectId } from "mongoose";
import StatisticModel from "./model";
import { MetricType, Statistic } from "@/lib/types/statistic";

export interface PaginatedStatisticsResponse {
  statistics: Statistic[] | Statistic | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface StatisticQueryFilters {
  _id?: mongoose.Types.ObjectId;
  professional?: mongoose.Types.ObjectId;
  timeStamp?: Date;
  metric?: "dialClick" | "profileVisit" | "review";
}

export const getStatistics = async (
  filters: StatisticQueryFilters & { page?: number; limit?: number }
): Promise<PaginatedStatisticsResponse> => {
  const query = buildQueryFromFilters(filters);
  let statistics: Statistic | Statistic[] | any;

  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  statistics = await StatisticModel.find(query).skip(skip).limit(limit).lean();

  const total = await StatisticModel.countDocuments(query);

  return {
    statistics,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };

  // Creating a query object from the filters
  function buildQueryFromFilters(
    params: StatisticQueryFilters
  ): Record<string, any> {
    const filters: StatisticQueryFilters = {};
    if (params._id) {
      if (isValidObjectId(params._id))
        filters._id = new mongoose.Types.ObjectId(params._id);
    }

    if (params.professional && isValidObjectId(params.professional))
      filters.professional = new mongoose.Types.ObjectId(
        params.professional
      ) as mongoose.Types.ObjectId;
    if (params.timeStamp) filters.timeStamp = params.timeStamp as Date;
    if (params.metric) filters.metric = params.metric as MetricType;

    return filters;
  }
};
