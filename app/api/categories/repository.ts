import { Category } from '@/lib/types/category';
import models from '@/models';

const { CategoryModel } = models;

export const createCategory = async (categoryData: Category) => {
    const category = new CategoryModel(categoryData);
    return await category.save();
};

export const getCategoryById = async (id: string) => {
    return await CategoryModel.findById(id);
};

export const getAllCategories = async () => {
    return await CategoryModel.find();
};

export const updateCategory = async (id: string, updateData: Partial<Category>) => {
    return await CategoryModel.findByIdAndUpdate(id, updateData);
};

export const deleteCategory = async (id: string) => {
    return await CategoryModel.findByIdAndUpdate(id);
};

export const permanentlyDeleteCategory = async (id: string) => {
    return await CategoryModel.findByIdAndDelete(id);
};
