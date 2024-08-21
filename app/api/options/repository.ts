import { Option } from '@/lib/types/option';
import models from '@/models';

const { OptionModel } = models;

export const createOption = async (optionData: Option) => {
  const option = new OptionModel(optionData);
  return await option.save();
};

export const getOptionById = async (id: string) => {
  return await OptionModel.findById(id);
};

export const getAllOptions = async () => {
  return await OptionModel.find();
};

export const updateOption = async (id: string, updateData: Partial<Option>) => {
  return await OptionModel.findByIdAndUpdate(id, updateData);
};

export const deleteOption = async (id: string) => {
  return await OptionModel.findByIdAndDelete(id);
};