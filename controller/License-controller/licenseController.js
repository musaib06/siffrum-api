import { License } from "../../db/dbconnection.js";
// const License = db.License;

// CREATE License
export const createLicense = async (req, res) => {
  try {
    const newLicense = await License.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(newLicense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET All Licenses
export const getAllLicenses = async (req, res) => {
  try {
    const licenses = await License.findAll();
    res.status(200).json(licenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET License by ID
export const getLicenseById = async (req, res) => {
  try {
    const license = await License.findByPk(req.params.id);
    if (!license) return res.status(404).json({ message: "License not found" });
    res.status(200).json(license);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE License
export const updateLicense = async (req, res) => {
  try {
    const license = await License.findByPk(req.params.id);
    if (!license) return res.status(404).json({ message: "License not found" });

    await license.update(req.body);
    res.status(200).json({ message: "License updated", license });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE License
export const deleteLicense = async (req, res) => {
  try {
    const license = await License.findByPk(req.params.id);
    if (!license) return res.status(404).json({ message: "License not found" });

    await license.destroy();
    res.status(200).json({ message: "License deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
