import { BaseUser, CustomerUser, ProfessionalUser } from "@/lib/types/user";

import { Customer, Professional, UserModel as User } from "./model";

export const createUser = async (userData: BaseUser) => {
  const user = new User(userData);
  return await user.save();
};

export const createCustomer = async (customerData: CustomerUser) => {
  const customer = new Customer(customerData);
  return await customer.save();
};

export const createProfessional = async (
  professionalData: ProfessionalUser
) => {
  const professional = new Professional(professionalData);
  return await professional.save();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const updateUser = async (id: string, updateData: Partial<BaseUser>) => {
  return await User.findByIdAndUpdate(id, updateData);
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true });
};

export const permanentlyDeleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
