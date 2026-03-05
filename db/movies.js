import {Movies} from "..models/moviesModule.js"

export const getAllMovies = async () => {
    return await Movies.find().populate("movies");
}

export const getMovieById = async(id) => {
    const movie = await Movies.findById(id).populate("movies")

    return movie || null
}

export const createMovie = async (title, year, genres, durationMinutes, director) => {
    
}