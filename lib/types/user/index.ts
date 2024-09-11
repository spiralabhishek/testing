import mongoose from "mongoose";
import {
  Availability,
  Banner,
  FAQ,
  ILocation,
  PriceList,
  SocialMedia,
  Subscription,
  Theme,
  UserType,
} from "../common";

export interface BaseUser extends Document {
  _id: mongoose.Types.ObjectId;
  type: UserType;
  clerkId: string;
  name: string;
  profilePicture?: string;
  phone?: string;
  email: string;
  bio?: string;
  isDeleted?: boolean;
  inquiries?: mongoose.Types.ObjectId[];
}

export interface CustomerUser extends BaseUser {
  following: mongoose.Types.ObjectId[];
}

export interface ProfessionalUser extends BaseUser {
  coverPhoto?: string;
  vat: string;
  skills: string[];
  languages: string[];
  verified: boolean;
  qr?: string;
  banner?: Banner;
  theme?: Theme;
  availability?: Availability;
  faq?: FAQ[];
  priceList?: PriceList[];
  teamMembers?: mongoose.Types.ObjectId[];
  socialMedia?: SocialMedia;
  subscription?: Subscription;
  followedBy?: mongoose.Types.ObjectId[];
  categories?: mongoose.Types.ObjectId[];
  reviews?: mongoose.Types.ObjectId[];
  post?: mongoose.Types.ObjectId[];
  geoLocation?: ILocation;
}
