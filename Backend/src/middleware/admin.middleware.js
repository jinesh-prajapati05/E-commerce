import express from "express";
import dotenv from 'dotenv'
import {userModel} from '../models/auth.models.js'
dotenv.config()

export async function admin(req,res,next) {
  try {
    const user = req.user;
    const isUserName = user.userName === process.env.ADMIN_USERNAME
    const isEmail = user.email === process.env.ADMIN_EMAIL
    const isRole = user.role === process.env.ROLE
    
    if (!isUserName || !isEmail || !isRole) {
        return res.status(404).json({
            message: "Access denied"
        })
    }

    next();

  } catch (error) {
    res.status(401).json({
      message: "Internal Token",
      error: error.message,
    });
  }
}
