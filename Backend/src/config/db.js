import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("Connected Successfully!");
  } catch (error) {
    console.log(error)
    throw new Error("Error", error);
  }
}
