import mongoose from "mongoose";

// TODO: Add Director schema and model

const directorSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true,
        unique: true
    }}, { timestamps: true })

directorSchema.index = ({ name: "text" })

const Director = mongoose.model("Director", directorSchema)

export default Director