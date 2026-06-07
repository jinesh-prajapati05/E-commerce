import express from 'express'
import { app } from './src/app.js';
import { connectDB } from './src/config/db.js';
import dotenv from 'dotenv'
dotenv.config()

connectDB()

app.listen( process.env.PORT,() => {
    console.log("PORT is running :", process.env.PORT)
})