import mongoose from "mongoose";

export interface Statistic extends Document {
  _id: mongoose.Types.ObjectId;
  professional: mongoose.Types.ObjectId;
  timeStamp: Date;
  metric: MetricType;
}

export type MetricType = "dialClick" | "profileVisit" | "review";
