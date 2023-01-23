import * as ChatService from "../dao/services/chat.service.js";
import { STATUS } from "../constants/constants.js";

export async function getChats(req, res) {
  try {
    const response = await ChatService.getChats();
    res.json({
      chats: response,
      status: STATUS.SUCCESS,
    });
    return chats
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function createChat(req, res) {
  try {
    const { body } = req;
    const response = await ChatService.createChat(body);
    res.status(201).json({
      chat: response,
      status: STATUS.SUCCESS,
    });
    return response
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

