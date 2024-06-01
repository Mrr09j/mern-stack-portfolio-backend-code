import express from "express";
import {
  getAllMessage,
  sendMessage,
  deleteMessages,
} from "../Controllers/messageController.js";
import { isAuthenticated } from "../Middlewares/auth.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getAll", getAllMessage);
router.delete("/delete/:id", isAuthenticated, deleteMessages);

export default router;
