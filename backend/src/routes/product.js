import express from "express";

const router = express.Router();

import Product from "../controllers/product/index.js";

import grantAccess from "../middlewares/grantAccess.js";
import { verifyAccessToken } from "../helpers/jwt.js";

router.post("/", verifyAccessToken, grantAccess("createAny", "product"), Product.Create);

router.get("/:product_id", Product.Get);

router.get("/", Product.GetList);
router.put("/:product_id", Product.Update);
router.delete("/:product_id", Product.Delete);

export default router;
