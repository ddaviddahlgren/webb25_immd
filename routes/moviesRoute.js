import { Router } from "express";
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../db/movies.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const { director } = req.query
        const movies = await getAllMovies(director)
        if (!movies) return res.status(404).json({ error: "No movies found" })
        return res.status(200).json(movies)
    } catch (error) {
        return res.status(500).json({ error: "Failed to find movies", details: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const movie = await getMovieById(id)
        if (!movie) return res.status(404).json({ error: "Could not find movie" })
        return res.status(200).json(movie)
    } catch (error) {
        return res.status(500).json({ error: "Failed to find movie", details: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const { title, year, genres, durationMinutes, director } = req.body
        if (!title || !year || !genres || !durationMinutes || !director) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const newMovie = await createMovie(title, year, genres, durationMinutes, director)
        return res.status(201).json(newMovie)
    } catch (error) {
        return res.status(500).json({ error: "Failed to create movie", details: error.message })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const movie = await updateMovie(req.params.id, req.body)
        if (!movie) return res.status(404).json({ error: "Movie not found" })
        return res.status(200).json(movie)
    } catch (error) {
        return res.status(500).json({ error: "Failed to update movie", details: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const movie = await deleteMovie(req.params.id)
        if (!movie) return res.status(404).json({ error: "Movie not found" })
        return res.status(200).json({ message: "Movie deleted successfully" })
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete movie", details: error.message })
    }
})

export default router