import { InquiryType } from "@/lib/types/common";
import { Inquiry } from "@/lib/types/inquiry";
import mongoose, { Schema, Document } from "mongoose";

const InquirySchema = new Schema<Inquiry>({
  type: { type: String, enum: Object.values(InquiryType), required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  anonymous: { type: Boolean, default: false },
  postedBy: { type: Schema.Types.ObjectId, ref: "Users", required: true },
});

const InquiryModel =
  mongoose.models.Inquiries ||
  mongoose.model<Inquiry>("Inquiries", InquirySchema);

export default InquiryModel;
