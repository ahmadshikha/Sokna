import express from "express";
import { addProduct,exampleCreateCarProduct,exampleCreatePhoneProduct } from "../controllers/ProductController.js";
import {verifyToken} from "../middleware/verifyToken.js";


const router = express.Router();

router.post("/addProduct",verifyToken, addProduct);
router.post("/exampleCreateCarProduct", exampleCreateCarProduct);
router.post("/exampleCreatePhoneProduct", exampleCreatePhoneProduct);

export default router;
