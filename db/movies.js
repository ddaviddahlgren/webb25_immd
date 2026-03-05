import Movies from "../models/moviesModel.js"

export const getAllMovies = async () => {
    return await Movies.find()
}

export const getMovieById = async(id) => {
    const movie = await Movies.findById(id)

    return movie || null
}

export const createMovie = async (title, year, genres, durationMinutes, director) => {
    const newMovie = new Movies({
        title,
        year,
        genres,
        durationMinutes,
        director
    })

    await newMovie.save()
    return newMovie
}