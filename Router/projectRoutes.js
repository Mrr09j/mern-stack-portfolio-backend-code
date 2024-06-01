import express from "express";
import {
  addNewProject,
  deleteProject,
  updateProject,
  getAllProject,
  getSingProject,
} from "../Controllers/projectController.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/getall", getAllProject);
router.get("/get/:id", getSingProject);

export default router;
