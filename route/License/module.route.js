import express from "express";
import {
 createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule,
  getTotalModuleCount
} from "../../controller/License-controller/module.controller.js";

import { authenticateToken } from "../../middlewares/auth/auth.js";

const router = express.Router();

router.post("/create",authenticateToken, createModule);
router.get("/getall",authenticateToken, getAllModules);
router.get("/count",authenticateToken, getTotalModuleCount);
router.get("/getbyid/:id",authenticateToken, getModuleById);
router.put("/update/:id",authenticateToken, updateModule);
router.delete("/delete/:id",authenticateToken, deleteModule);

export default router;
