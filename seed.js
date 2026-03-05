import "dotenv/config";
import * as db from "./config/db.js";
import Director from "./models/Director.js"; // your mongoose model
import directors from "./data/directors.json" with { type: "json" }; // your seed data
import Movies from "./models/moviesModel.js";
import movies from "./data/movies.json" with { type: "json" }; // your seed data

async function seed() {
    await db.connectToDb(process.env.DB_NAME);

    await Director.deleteMany({}) // wipe existing data
    await Director.insertMany(directors)
    console.log("✅ Directors seeded successfully")

    await Movies.deleteMany({})
    await Movies.insertMany(movies)
    console.log("Movies seeded successfully")
    
    await db.disconnectFromDb();
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});