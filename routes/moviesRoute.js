import { Router } from "express";
import { getAllMovies, getMovieById, createMovie } from "../db/movies.js";

const router = Router()

router.get('/', async (req,res) => {

    try {
        const movies = await getAllMovies()
        if(!movies) {
            res.status(400).json({err: "Movie not found"})
        }
        
        res.status(200).json(movies)
    } catch(err){
        console.error("Error in finding movies", err.message)
        res.status(500).json({
            error: "Failed to find movies",
            details: err.message
        })
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json({err: "Id is not a number"})
        }

        const movie = await getMovieById(id)

        if(!movie){
            res.status(404).json({err: "Could not find movie"})
        }

        res.status(200).json(movie)
    } catch(err){
        console.error("Error in finding movie by id", err.message)
        res.status(500).json({
            error: "Failed to find movie",
            details: err.message
        })
    }
})

router.post('/', async(req,res) => {
    try {
        const {title, year, genres, durationMinutes, director} = req.body
        
        if(!title || !year || !genres || !durationMinutes || !director){
            res.status(400).json({err: "Invalid credentials"})
        }

        const newMovie = await createMovie(title, year, genres, durationMinutes, director)
        
        res.status(201).json(newMovie)
    } catch(error){
        console.error("Error in creating a new movie")
        res.status(500).json({
            error: "Failed to create movie",
            details: err.message
        })
    }
})



export default router