import { Board } from '@/lib/types/board';
import models from '@/models';

const { BoardModel } = models;


export const createBoard = async (boardData: Board) => {
    const board = new BoardModel(boardData);
    return await board.save();
};

export const getBoardById = async (id: string) => {
    return await BoardModel.findById(id);
};

export const updateBoard = async (id: string, updateData: Partial<Board>) => {
    return await BoardModel.findByIdAndUpdate(id, updateData);
};

export const deleteBoard = async (id: string) => {
    return await BoardModel.findByIdAndDelete(id);
};

export const permanentlyDeleteBoard = async (id: string) => {
    return await BoardModel.findByIdAndDelete(id);
};
