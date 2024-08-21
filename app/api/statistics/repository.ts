import { Statistic } from '@/lib/types/statistic';
import models from '@/models';

const { StatisticModel } = models;

export const createStatistic = async (statisticData: Statistic) => {
  const statistic = new StatisticModel(statisticData);
  return await statistic.save();
};

export const getStatisticById = async (id: string) => {
  return await StatisticModel.findById(id);
};

export const getAllStatistics = async () => {
  return await StatisticModel.find();
};

export const updateStatistic = async (id: string, updateData: Partial<Statistic>) => {
  return await StatisticModel.findByIdAndUpdate(id, updateData);
};

export const deleteStatistic = async (id: string) => {
  return await StatisticModel.findByIdAndDelete(id);
};
