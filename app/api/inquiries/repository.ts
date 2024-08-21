import { Inquiry } from '@/lib/types/inquiry';
import models from '@/models';

const { InquiryModel } = models;

export const createInquiry = async (inquiryData: Inquiry) => {
  const inquiry = new InquiryModel(inquiryData);
  return await inquiry.save();
};

export const getInquiryById = async (id: string) => {
  return await InquiryModel.findById(id);
};

export const getAllInquiries = async () => {
  return await InquiryModel.find({ isDeleted: false });
};

export const updateInquiry = async (id: string, updateData: Partial<Inquiry>) => {
  return await InquiryModel.findByIdAndUpdate(id, updateData);
};

export const deleteInquiry = async (id: string) => {
  return await InquiryModel.findByIdAndUpdate(id, { isDeleted: true });
};

export const permanentlyDeleteInquiry = async (id: string) => {
  return await InquiryModel.findByIdAndDelete(id);
};
