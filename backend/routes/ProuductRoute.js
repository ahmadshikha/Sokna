import express from "express";
import { addProduct,exampleCreateCarProduct,exampleCreatePhoneProduct } from "../controllers/ProductController.js";
import {verifyToken} from "../middleware/verifyToken.js";
import { initializeBasicCategories } from "../utils/functions.js";


const router = express.Router();

router.post("/addProduct",verifyToken, addProduct);
router.post("/addCategore", initializeBasicCategories);
router.post("/exampleCreateCarProduct", exampleCreateCarProduct);
router.post("/exampleCreatePhoneProduct", exampleCreatePhoneProduct);

export default router;
