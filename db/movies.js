import Movies from "../models/moviesModel.js"

export const getAllMovies = async (director) => {
    let filter = {}

    if (director) {
        filter.director = { $regex: director, $options: "i" }
    }
    
    return await Movies.find(filter)
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

export const updateMovie = async (id, updates) => {
    return await Movies.findByIdAndUpdate(
        id,
        updates,
        { new: true } 
    )
}

export const deleteMovie = async (id) => {
    const result = await Movies.findByIdAndDelete(id)
    return result
}