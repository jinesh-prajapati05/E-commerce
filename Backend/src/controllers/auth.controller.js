import express from "express";
import { userModel } from "../models/auth.models.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { blackListModel } from "../models/blacklist.models.js";
dotenv.config();

async function register(req, res) {
  try {
    const { userName, email, password, adminSecret } = req.body;

    let role = "user";

    if (adminSecret === process.env.ADMIN_SECRET) {
      role = "admin";
    }

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "Plese Enter username, email and password!",
      });
    }

    const isAlreadyRegister = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isAlreadyRegister) {
      return res.status(400).json({
        message: "This username or email Already registerd.",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      userName,
      email,
      password: hash,
      role,
    });

    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: isProd ? true : false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "Plese Enter emai or password.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Plese Enter Valid email",
      });
    }

    const hash = await bcrypt.compare(password, user.password);

    if (!hash) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: isProd ? true : false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Successfully Login",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
async function logout(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: "Token not provide.",
      });
    }

    await blackListModel.create({ token });

    res.clearCookie("token");

    res.status(200).json({
      message: "User Logout successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("userName email role");

    if (!user) {
      return res.status(400).json({
        message: "User Not found",
      });
    }

    res.status(200).json({
      message: "User Fetched Successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

export default {
  register,
  login,
  logout,
  getMe,
};
