import mongoose from "mongoose";
import { ILocation, Media } from "../common";

export interface BasePost extends Document {
    _id: mongoose.Types.ObjectId;
    type: string;
    icon: string;
    color: string;
    title: string;
    media: Media;
    description: string;
    board?: mongoose.Types.ObjectId;
    phone: string;
    postedBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    price?: number;
}

export interface PropertyPost extends BasePost {
    bedroomsNumber: number;
    propertyType: string;
    size: string;
    propertyTax: number;
    houseCommitteeTax: number;
    propertyFeatures: string[];
    additionalFeatures: string[];
}

export interface ProductPost extends BasePost {
    condition: string;
    quantity: number;
    sku: string;
    Location: ILocation;
    warranty: boolean;
    deliveryMethod: string;
    deliveryTime: { start: Date; end: Date };
}

export interface ServicePost extends BasePost {
    serviceType: string;
}

export interface ProjectPost extends BasePost {
    price: number;
}

export interface JobPost extends BasePost {
    field: string;
    Location: ILocation;
    features: string[];
    salary: number;
}

// export interface CreatePostRequest {
//     type: string;
//     icon: string;
//     color: string;
//     title: string;
//     media: string[];
//     description: string;
//     board?: string;
//     phone: string;
//     postedBy: string;
//     isActive?: boolean;
//     price?: number;
// }

// export interface UpdatePostRequest extends Partial<CreatePostRequest> { }

// export interface CreatePropertyRequest extends CreatePostRequest {
//     bedroomsNumber: number;
//     propertyType: string;
//     size: string;
//     ILocation: string;
//     propertyTax: number;
//     houseCommitteeTax: number;
//     propertyFeatures?: string[];
//     additionalFeatures?: string[];
//     price: number;
// }

// export interface UpdatePropertyRequest extends Partial<CreatePropertyRequest> { }

// export interface CreateProductRequest extends CreatePostRequest {
//     condition: string;
//     quantity: number;
//     sku: string;
//     warranty: boolean;
//     deliveryMethod: string;
//     deliveryTime: {
//         start: Date;
//         end: Date;
//     };
// }

// export interface UpdateProductRequest extends Partial<CreateProductRequest> { }

// export interface CreateServiceRequest extends CreatePostRequest {
//     serviceType: string;
//     price: number;
// }

// export interface UpdateServiceRequest extends Partial<CreateServiceRequest> { }

// export interface CreateProjectRequest extends CreatePostRequest {
//     price: number;
// }

// export interface UpdateProjectRequest extends Partial<CreateProjectRequest> { }

// export interface CreateJobRequest extends CreatePostRequest {
//     ILocation: string;
//     field: string;
//     features?: string[];
//     salary: number;
// }

// export interface UpdateJobRequest extends Partial<CreateJobRequest> { }
