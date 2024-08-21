import { Option } from '@/lib/types/option';
import mongoose, { Schema, Document } from 'mongoose';
//  each object needs to store multipe options
// see docs for ref : https://view.monday.com/1575216158-1d5353e2af0686437903475d88fa2ff2?r=euc1

const OptionSchema = new Schema<Option>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  values: [{ type: String, required: true }],
  isEditable: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now },
});

const OptionModel = mongoose.models.Options || mongoose.model<Option>('Options', OptionSchema);

export default OptionModel