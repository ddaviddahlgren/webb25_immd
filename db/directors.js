import Director from "../models/Director.js"
import { getFullTextSearch } from "../utils/fullTextSearch.js"

export async function getAllDirectors(q) {
    let filter = { }
    if (q) {
        filter = {
            ...filter,
            ...getFullTextSearch(q, true, "name")
        }
    }
    console.log(filter)
    try {
        return await Director.find(filter)
    } catch(err) {
        console.error("Unable to read from Directors", err)
        return null
    }
}

export async function getDirectorById(id){
    try {
        return await Director.findById(id)
    } catch (err) {
        console.error("Unable to read from Directors", err)
        return null
    }
}

export async function createDirector(data){
    try {
        return await Director.create(data)
    } catch (err) {
        console.error("Unable to create Director", err)
        return null
    }
}

export async function updateDirector(id, data){
    try {
        const updatedDirector = await Director.findByIdAndUpdate(id, data, { returnDocument: "after" })
        if(!updatedDirector) return null;
        return updatedDirector
    } catch (err) {
        console.error("Unable to create Director", err)
        return null
    }
}

export async function deleteDirector(id){
    try {
        const deleted = await Director.findByIdAndDelete(id)
        return !!deleted
    } catch (err) {
        console.error("Unable to delete Director")
        return false        
    }
}