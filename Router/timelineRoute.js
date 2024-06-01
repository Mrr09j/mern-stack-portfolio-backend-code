import express from "express";
import {
  PostTimeline,
  deleteTimeline,
  getAllTimelines,
} from "../Controllers/timelineController.js";
import { isAuthenticated } from "../Middlewares/auth.js";
const router = express.Router();

router.post("/add", isAuthenticated, PostTimeline);
router.get("/getAll", getAllTimelines);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);

export default router;
