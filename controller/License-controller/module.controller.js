import { Module } from "../../db/dbconnection.js";
import { sendSuccess, sendError } from "../../Helper/response.helper.js";

// CREATE Module
export const createModule = async (req, res) => {
  try {
    const { reqData } = req.body;

    const newModule = await Module.create({
      ...reqData,
      createdBy: req.user?.id || null,
      lastModifiedBy: req.user?.id || null,
    });

    return sendSuccess(res, newModule, 201);
  } catch (error) {
    return sendError(res, error.message);
  }
};

// GET All Modules with Pagination
export const getAllModules = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const top = parseInt(req.query.top) || 10;

    const modules = await Module.findAll({ offset: skip, limit: top });
    return sendSuccess(res, modules);
  } catch (error) {
    return sendError(res, error.message);
  }
};

// GET Total Module Count
export const getTotalModuleCount = async (req, res) => {
  try {
    const count = await Module.count();
    return sendSuccess(res, count);
  } catch (error) {
    return sendError(res, error.message);
  }
};

// GET Module by ID
export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return sendError(res, "Module not found", 404);
    return sendSuccess(res, module);
  } catch (error) {
    return sendError(res, error.message);
  }
};

// UPDATE Module
export const updateModule = async (req, res) => {
  try {
    const { reqData } = req.body;

    const module = await Module.findByPk(req.params.id);
    if (!module) return sendError(res, "Module not found", 404);

    await module.update({
      ...reqData,
      lastModifiedBy: req.user?.id || null,
    });

    return sendSuccess(res, module);
  } catch (error) {
    return sendError(res, error.message);
  }
};

// DELETE Module
export const deleteModule = async (req, res) => {
  try {
    const moduleId = req.params.id || req.body?.id;

    if (!moduleId) return sendError(res, "Module ID is required", 400);

    const module = await Module.findByPk(moduleId);
    if (!module) return sendError(res, "Module not found", 404);

    await module.destroy();
    return sendSuccess(res, { message: "Module deleted" });
  } catch (error) {
    return sendError(res, error.message);
  }
};
