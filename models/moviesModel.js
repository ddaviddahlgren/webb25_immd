import mongoose from "mongoose"

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    year: {
        type: Number,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    durationMinutes: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    }
})

const Movies = mongoose.model("Movies", moviesSchema)

export default Movies