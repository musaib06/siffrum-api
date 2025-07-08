import express from "express";
import {
  createLicense,
  getAllLicenses,
  getLicenseById,
  updateLicense,
  deleteLicense,
  getTotalLicenseCount
} from "../../controller/License-controller/licenseController.js";
import { authenticateToken } from "../../middlewares/auth/auth.js";

const router = express.Router();

// Middleware: Protected Routes
router.post('/create', authenticateToken, createLicense);
router.get('/getall', getAllLicenses);
router.get('/getbyid/:id', getLicenseById);
router.put('/update/:id', authenticateToken, updateLicense);
router.delete('/delete/:id', authenticateToken, deleteLicense);
router.get('/count', authenticateToken, getTotalLicenseCount);

export default router;
