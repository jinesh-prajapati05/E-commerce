import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token: {
        type: String
    }
})

export const blackListModel = mongoose.model("blacklist", blackListSchema)