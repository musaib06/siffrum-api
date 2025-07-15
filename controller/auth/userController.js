import { User } from "../../db/dbconnection.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../middlewares/auth/auth.js";
import { sendSuccess, sendError } from "../../Helper/response.helper.js";

// REGISTER
export const registerController = async (req, res) => {
  const { reqData } = req.body;
  const { username, email, password, role } = reqData;

  const validRoles = ["superAdmin", "Vendor", "endUser", "culturerContributor"];
  if (!role || !validRoles.includes(role)) {
    return sendError(res, "User Not Found", 404);
  }

  try {
    const existUser = await User.findOne({ where: { username } });
    if (existUser) return sendError(res, "User already exists", 409);

    const hashedPass = await bcryptjs.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPass,
      role,
      createdBy: req.user?.role || null,
      lastModifiedBy: req.user?.role || null,
    });

    return sendSuccess(
      res,
      {
        username,
        email,
        role: user.role,
      },
      201
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

// LOGIN
export const loginController = async (req, res) => {
  const { reqData } = req.body;
  const { username, password, role } = reqData;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return sendError(res, "User does not exist", 404);

    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) return sendError(res, "User does not exist", 404);

    // Optional strict role check
    if (role && user.role !== role) {
      return sendError(res, "User does not exist", 404); // Forbidden
    }

    const accessToken = await generateAccessToken(user.dataValues);
    const refereshToken = await generateRefreshToken(user.dataValues);
    await user.update({ refereshToken });

    res.cookie("refereshToken", refereshToken, {
      httpOnly: true,
      secure: true,
    });

    return sendSuccess(res, {
      username: user.username,
      role: user.role,
      accessToken,
      refereshToken,
    });
  } catch (error) {
    return sendError(res, "Internal Error");
  }
};

// REFRESH TOKEN
export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refereshToken;
  if (!refreshToken) return sendError(res, "Token is empty", 403);

  try {
    const user = await User.findOne({ where: { refereshToken: refreshToken } });
    if (!user) return sendError(res, "User not found", 403);

    jwt.verify(refreshToken, "cdef", async (error, decoded) => {
      if (error) return sendError(res, "Invalid token", 403);

      const accessToken = await generateAccessToken(user.dataValues);
      return sendSuccess(res, { accessToken });
    });
  } catch (e) {
    return sendError(res, "Internal Error");
  }
};

// LOGOUT
export const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refereshToken;
  if (!refreshToken) return sendError(res, "Token is empty", 403);

  try {
    const user = await User.findOne({ where: { refereshToken: refreshToken } });
    if (user) await user.update({ refereshToken: null });

    res.clearCookie("refereshToken");
    return sendSuccess(res, { message: "Logged out successfully" });
  } catch (e) {
    return sendError(res, "Internal Error");
  }
};

// PROFILE (Example Protected Route)
export const profileController = async (req, res) => {
  return sendSuccess(res, { message: "Dashboard" });
};
