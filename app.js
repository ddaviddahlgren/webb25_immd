import express from "express";
import directorRouter from "./routes/directorRoute.js";
import moviesRouter from "./routes/moviesRoute.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

//TODO: Add routes here

app.use("/api/directors/", directorRouter)
app.use("/api/movies/", moviesRouter)


export default app;
export { PORT };
