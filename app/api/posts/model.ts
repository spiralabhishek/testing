import { ILocation, Media } from '@/lib/types/common';
import { BasePost, JobPost, ProductPost, ProjectPost, PropertyPost, ServicePost } from '@/lib/types/post';
import mongoose, { Schema, Document } from 'mongoose';

const baseOptions = { discriminatorKey: 'type' };

const MediaSchema = new Schema<Media>({
  images: { type: [String] },
  videos: { type: [String] },
});

const BasePostSchema = new Schema<BasePost>({
  type: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  title: { type: String, required: true },
  media: [{ type: MediaSchema, required: true }],
  description: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: 'Boards', default: null },
  phone: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  price: { type: Schema.Types.Decimal128 },
}, baseOptions);

const LocationSchema = new Schema<ILocation>({
  city: { type: String },
  country: { type: String },
  address: { type: String },
  remote: { type: Boolean },
  radiusKm: { type: Number },
  zip: { type: Number },
  coordinates: { type: [Number] }
});

const PostModel = mongoose.models.Posts || mongoose.model<BasePost>('Posts', BasePostSchema);

let PropertySchema: Schema;
if (!PostModel.discriminators?.Property) {
  PropertySchema = new Schema({
    bedroomsNumber: { type: Number, required: true },
    propertyType: { type: String, required: true },
    size: { type: String, required: true },
    Location: { type: LocationSchema, required: true },
    propertyTax: { type: Number, required: true },
    houseCommitteeTax: { type: Number, required: true },
    propertyFeatures: [{ type: String }],
    additionalFeatures: [{ type: String }],
    price: { type: Schema.Types.Decimal128, required: true },
  });
  PostModel.discriminator<PropertyPost>('Property', PropertySchema);
} else {
  PropertySchema = PostModel.discriminators.Property.schema;
}

export const Property = PostModel.discriminators?.Property || PostModel.discriminator<PropertyPost>('Property', PropertySchema);

let ProductSchema: Schema;
if (!PostModel.discriminators?.Product) {
  ProductSchema = new Schema({
    condition: { type: String, required: true },
    quantity: { type: Number, required: true },
    sku: { type: String, required: true },
    warranty: { type: Boolean, required: true },
    deliveryMethod: { type: String, required: true },
    deliveryTime: {
      start: { type: Date, required: true },
      end: { type: Date, required: true }
    },
  });
  PostModel.discriminator<ProductPost>('Product', ProductSchema);
} else {
  ProductSchema = PostModel.discriminators.Product.schema;
}

export const Product = PostModel.discriminators?.Product || PostModel.discriminator<ProductPost>('Product', ProductSchema);

let ServiceSchema: Schema;
if (!PostModel.discriminators?.Service) {
  ServiceSchema = new Schema({
    serviceType: { type: String, required: true },
    price: { type: Schema.Types.Decimal128, required: true },
  });
  PostModel.discriminator<ServicePost>('Service', ServiceSchema);
} else {
  ServiceSchema = PostModel.discriminators.Service.schema;
}

export const Service = PostModel.discriminators?.Service || PostModel.discriminator<ServicePost>('Service', ServiceSchema);

let ProjectSchema: Schema;
if (!PostModel.discriminators?.Project) {
  ProjectSchema = new Schema({
    price: { type: Schema.Types.Decimal128, required: true },
  });
  PostModel.discriminator<ProjectPost>('Project', ProjectSchema);
} else {
  ProjectSchema = PostModel.discriminators.Project.schema;
}

export const Project = PostModel.discriminators?.Project || PostModel.discriminator<ProjectPost>('Project', ProjectSchema);

let JobSchema: Schema;

if (!PostModel.discriminators?.Job) {
  JobSchema = new Schema({
    Location: { type: LocationSchema, required: true },
    field: { type: String, required: true },
    features: [{ type: String }],
    salary: { type: Schema.Types.Decimal128, required: true },
  });
  PostModel.discriminator<JobPost>('Job', JobSchema);
} else {
  JobSchema = PostModel.discriminators.Job.schema;
}

export const Job = PostModel.discriminators?.Job || PostModel.discriminator<JobPost>('Job', JobSchema);

export default PostModel