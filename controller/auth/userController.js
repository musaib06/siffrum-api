import { User } from "../../db/dbconnection.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../middlewares/auth/auth.js";

export const registerController = async (req, res) => {
  const { username, email, password, role } = req.body;

  const validRoles = ["superAdmin", "Vendor", "endUser", "Researcher"];
  if (!role || !validRoles.includes(role)) {
    return res.status(400).json("Invalid or missing role");
  }

  const existUser = await User.findOne({ where: { username } });
  if (existUser != null) {
    return res.status(409).json("User already exists");
  }

  const hashedPass = await bcryptjs.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPass,
      role,
    });

    return res.status(201).json({
      message: "User signed in",
      userData: {
        username,
        email,
        role: user.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", detail: error.message });
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const exist = await User.findOne({ where: { username } });
    if (!exist) {
      return res.status(404).json("User does not exist");
    }

    const isValid = await bcryptjs.compare(password, exist.password); // FIXED: Added await
    if (!isValid) {
      return res.status(401).json("Invalid credentials");
    }

    const accessToken = await generateAccessToken(exist.dataValues);
    const refereshToken = await generateRefreshToken(exist.dataValues);
    await exist.update({ refereshToken });

    res.cookie("refereshToken", refereshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({
      message: "User logged in",
      userData: {
        username: exist.dataValues.username,
        role: exist.dataValues.role, // <-- Include role in response
        accessToken,
        refereshToken,
      },
    });
  } catch (e) {
    console.error("Internal Error", e);
    res.status(500).json("Internal Error");
  }
};

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refereshToken;
  //console.log(refreshToken)
  try {
    if (!refreshToken) {
      return res.status(403).json("token is empty");
    }
    const user = await User.findOne({ where: { refereshToken: refreshToken } });
    //console.log("ddddddddddd",user)
    jwt.verify(refreshToken, "cdef", async (error, decoded) => {
      if (error) {
        return res.status(403).json("Invalid token");
      }
      const token = await generateAccessToken(user.dataValues);
      return res.status(200).json({ accessToken: token });
    });
  } catch (e) {
    return res.status(500).json("Intrnal Error");
  }
};

export const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refereshToken;
  if (!refreshToken) {
    return res.status(403).json("token is empty");
  }
  const user = await User.findOne({ where: { refereshToken: refreshToken } });
  if (user != null) {
    user.update({ refereshToken: null });
  }
  res.clearCookie("refereshToken");
  return res.status(200).json("logout successfully");
};

export const profileController = async (req, res) => {
  return res.json("Dashboard");
};
