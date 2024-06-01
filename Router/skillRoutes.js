import express from "express";
import { isAuthenticated } from "../Middlewares/auth.js";
import {
  addNewSkill,
  deleteSkill,
  updateSkill,
  getAllSkills,
} from "../Controllers/skillController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
router.put("/update/:id", isAuthenticated, updateSkill);
router.get("/getAll", getAllSkills);

export default router;
