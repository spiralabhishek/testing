import { BasePost, JobPost, ProductPost, ProjectPost, PropertyPost, ServicePost } from '@/lib/types/post';
import PostModel, {
  Property,
  Product,
  Service,
  Project,
  Job
} from './model';

export const createPost = async (postData: BasePost) => {
  const post = new PostModel(postData);
  return await post.save();
};

export const createProperty = async (propertyData: PropertyPost) => {
  const property = new Property(propertyData);
  return await property.save();
};

export const createProduct = async (productData: ProductPost) => {
  const product = new Product(productData);
  return await product.save();
};

export const createService = async (serviceData: ServicePost) => {
  const service = new Service(serviceData);
  return await service.save();
};

export const createProject = async (projectData: ProjectPost) => {
  const project = new Project(projectData);
  return await project.save();
};

export const createJob = async (jobData: JobPost) => {
  const job = new Job(jobData);
  return await job.save();
};

export const getPostById = async (id: string) => {
  return await PostModel.findById(id);
};

export const getAllPosts = async () => {
  return await PostModel.find({});
};

export const updatePost = async (id: string, updateData: Partial<BasePost>) => {
  return await PostModel.findByIdAndUpdate(id, updateData);
};

export const deletePost = async (id: string) => {
  return await PostModel.findByIdAndDelete(id);
};

export const permanentlyDeletePost = async (id: string) => {
  return await PostModel.findByIdAndDelete(id);
};
