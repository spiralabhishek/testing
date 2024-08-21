import {
  Availability,
  AvailableTime,
  Banner,
  FAQ,
  ILocation,
  PriceList,
  SocialMedia,
  Subscription,
  SubscriptionType,
  Theme,
  UserType,
} from "@/lib/types/common";
import { BaseUser, CustomerUser, ProfessionalUser } from "@/lib/types/user";
import mongoose, { Schema, SchemaOptions, FlatRecord } from "mongoose";

const baseOptions: SchemaOptions<FlatRecord<DocumentType>> = {
  discriminatorKey: "type",
  collection: "users",
};

const LocationSchema = new Schema<ILocation>({
  city: { type: String },
  address: { type: String },
  remote: { type: Boolean },
  radiusKm: { type: Number },
  coordinates: { type: [Number] },
  country: { type: String },
  zip: { type: Number },
});

const BaseUserSchema = new Schema(
  {
    type: { type: String, required: true, enum: Object.values(UserType) },
    name: { type: String, required: true },
    profilePicture: { type: String },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    Location: { type: LocationSchema },
    isDeleted: { type: Boolean, default: false },
    inquiries: [{ type: Schema.Types.ObjectId, ref: "Inquiries" }],
  },
  baseOptions
);

export const UserModel =
  mongoose.models?.Users || mongoose.model<BaseUser>("Users", BaseUserSchema);

export const Customer =
  UserModel.discriminators?.Customer ||
  UserModel.discriminator<CustomerUser>(
    "Customer",
    new Schema({
      following: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    })
  );

const SocialMediaSchema = new Schema<SocialMedia>({
  whatsapp: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  tiktok: { type: String },
  linkedin: { type: String },
  youtube: { type: String },
  link: { type: String },
});

const PriceListSchema = new Schema<PriceList>({
  price: { type: Number },
  title: { type: String },
});

const FAQSchema = new Schema<FAQ>({
  answer: { type: String },
  question: { type: String },
});

const AvailableTimeSchema = new Schema<AvailableTime>({
  day: { type: String },
  startTime: { type: String },
  endTime: { type: String },
});

const AvailabilitySchema = new Schema<Availability>({
  acceptingCalls: { type: Boolean },
  acceptingMessages: { type: Boolean },
  alwaysAvailable: { type: Boolean },
  availableTimes: { type: [AvailableTimeSchema] },
});

const BannerSchema = new Schema<Banner>({
  link: { type: String },
  text: { type: String },
});

const SubscriptionSchema = new Schema<Subscription>({
  type: { type: String, enum: Object.values(SubscriptionType) },
  price: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
});

export const Professional =
  UserModel.discriminators?.Professional ||
  UserModel.discriminator<ProfessionalUser>(
    "Professional",
    new Schema({
      coverPhoto: { type: String },
      vat: { type: String, unique: true },
      skills: [String],
      languages: [String],
      verified: { type: Boolean },
      qr: { type: String },
      banner: { type: BannerSchema },
      theme: { type: String, enum: Object.values(Theme) },
      availability: { type: AvailabilitySchema },
      faq: { type: FAQSchema },
      priceList: { type: PriceListSchema },
      teamMembers: [{ type: Schema.Types.ObjectId, ref: "Users" }],
      socialMedia: { type: SocialMediaSchema },
      subscription: { type: SubscriptionSchema },
      followedBy: [{ type: Schema.Types.ObjectId, ref: "Users" }],
      categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
      reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
      post: [{ type: Schema.Types.ObjectId, ref: "Posts" }],
    })
  );

export default UserModel;
