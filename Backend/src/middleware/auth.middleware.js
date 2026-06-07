import express from "express";
import { blackListModel } from "../models/blacklist.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token is not provide",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const isBlacklist = await blackListModel.findOne({ token });

    if (isBlacklist) {
      return res.status(401).json({
        message: "Token not provide",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Internal Token",
      error: error.message,
    });
  }
}

export default {
  authUser,
};
