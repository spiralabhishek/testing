import { TeamMember } from '@/lib/types/team-member';
import mongoose, { Schema, Document } from 'mongoose';

const TeamMemberSchema = new Schema<TeamMember>({
  image: { type: String, required: true },
  fullName: { type: String, required: true },
  position: { type: String, required: true },
  aboutMe: { type: String, required: true },
  phone: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'Professional', required: true },
});

const TeamMemberModel = mongoose.models.TeamMembers || mongoose.model<TeamMember>('TeamMembers', TeamMemberSchema);

export default TeamMemberModel