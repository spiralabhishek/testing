import { Statistic } from '@/lib/types/statistic';
import mongoose, { Schema, Document } from 'mongoose';

const StatisticSchema = new Schema<Statistic>({
  professional: { type: Schema.Types.ObjectId, ref: 'Professional', required: true },
  timeStamp: { type: Date, default: Date.now },
  metric: { type: String, enum: ['dialClick', 'profileVisit', 'review'], required: true },
});

const StatisticModel = mongoose.models.Statistics || mongoose.model<Statistic>('Statistics', StatisticSchema);

export default StatisticModel