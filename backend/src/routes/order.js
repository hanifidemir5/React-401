import express from "express";

const router = express.Router();
import Order from "../controllers/order/index.js";

import grantAccess from "../middlewares/grantAccess.js";
import { verifyAccessToken } from "../helpers/jwt.js";

router.post("/", verifyAccessToken, grantAccess("createAny", "order"), Order.Create);

// router.get("/:order_id", Order.Get);
router.get("/", Order.List);
// router.put("/:order_id", Order.Update);
// router.delete("/:order_id", Order.Delete);

export default router;
