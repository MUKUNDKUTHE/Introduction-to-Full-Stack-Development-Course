import express from "express";
import { getAllNews } from "../controllers/newsController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", protect, getAllNews);
export default router;
