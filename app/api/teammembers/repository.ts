import { TeamMember } from '@/lib/types/team-member';
import models from '@/models';

const { TeamMemberModel } = models;

export const createTeamMember = async (teamMemberData: TeamMember) => {
    const teamMember = new TeamMemberModel(teamMemberData);
    return await teamMember.save();
};

export const getTeamMemberById = async (id: string) => {
    return await TeamMemberModel.findById(id);
};

export const getAllTeamMembers = async () => {
    return await TeamMemberModel.find();
};

export const updateTeamMember = async (id: string, updateData: Partial<TeamMember>) => {
    return await TeamMemberModel.findByIdAndUpdate(id, updateData);
};

export const deleteTeamMember = async (id: string) => {
    return await TeamMemberModel.findByIdAndDelete(id);
};
