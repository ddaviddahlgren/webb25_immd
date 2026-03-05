import { Router } from "express";
import { getAllDirectors, getDirectorById, createDirector, updateDirector, deleteDirector } from "../db/directors.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const { q } = req.query
        const directors = await getAllDirectors(q)
        return res.json(directors)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const director = await getDirectorById(id)
        if (!director) {
            return res.status(404).json({ message: "Director does not exist" })
        }
        return res.json(director)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/", async (req, res) => {
    try {
        const { name, birthYear, nationality } = req.body

        if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Name is required and must be a string" })
        }
        if (!birthYear || typeof birthYear !== "number") {
            return res.status(400).json({ message: "Birth year is required and must be a number" })
        }
        if (!nationality || typeof nationality !== "string") {
            return res.status(400).json({ message: "Nationality is required and must be a string" })
        }

        const director = await createDirector({ name, birthYear, nationality })
        return res.status(201).json(director)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { name, birthYear, nationality } = req.body

        if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Name is required and must be a string" })
        }
        if (!birthYear || typeof birthYear !== "number") {
            return res.status(400).json({ message: "Birth year is required and must be a number" })
        }
        if (!nationality || typeof nationality !== "string") {
            return res.status(400).json({ message: "Nationality is required and must be a string" })
        }

        const updatedDirector = await updateDirector(id, { name, birthYear, nationality })
        if (!updatedDirector) {
            return res.status(404).json({ message: "Director does not exist" })
        }
        return res.status(200).json(updatedDirector)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await deleteDirector(id)
        if (!deleted) {
            return res.status(404).json({ message: "Director was not found" })
        }
        return res.status(200).json({ 
          message: "Director deleted successfully", 
          ...deleted
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

export default router