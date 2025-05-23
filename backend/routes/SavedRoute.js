import express from "express";
import {
 
  savePost
} from "../controllers/SavedPostController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();


router.post("/save", verifyToken,savePost );

export default router;
