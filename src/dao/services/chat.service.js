import { ChatModel } from "../models/chat.model.js";

export async function getChats() {
  try {
    const chat = await ChatModel.find({ deletedAt: { $exists: false } }).lean();
    return chat;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createChat(data) {
  try {
    const chat = await ChatModel.create(data);
    return chat;
  } catch (error) {
    throw new Error(error.message);
  }
}

