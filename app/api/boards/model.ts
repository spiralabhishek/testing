import { Board } from '@/lib/types/board';
import mongoose, { Schema, Document } from 'mongoose';
//use this for reference on how to strcture the files 

const BoardSchema = new Schema<Board>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
  image: { type: String, required: true }, // Path to the image
});

const BoardModel = mongoose.models.Boards || mongoose.model<Board>('Boards', BoardSchema);

export default BoardModel;
