import express from "express";
import {
  addNewApplication,
  deleteApplication,
  getAllApplications,
} from "../Controllers/softwareApplicationController.js";
import { isAuthenticated } from "../Middlewares/auth.js";
const router = express.Router();

router.post("/add", isAuthenticated, addNewApplication);
router.get("/getAll", getAllApplications);
router.delete("/delete/:id", isAuthenticated, deleteApplication);

export default router;
