import { Router } from "express";
import * as ChatsController from "../controllers/chats.controllers.js";

const chatsRouter = Router();

chatsRouter.get("/", ChatsController.getChats);

export default chatsRouter
