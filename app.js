import express from "express";
import fs from "fs";
import axios from "axios";
import bodyParser from "body-parser";
import qs from "querystring";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 9898;
const inputA = "";
const body = "";

app.set("view engine", "ejs");
app.use(express.static("./assets"));

app.use((req, _, next) => {
    console.log("Ein neuer Request:", req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&language=de-DE`)
        .then(movie => {
            res.render("index", { movieData: movie.data.results });
        });
});

app.get("/discover/:genreID", (req, res) => {
    const genreID = req.params.genreID;
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreID}`)
        .then(movie => {
            res.render("index", { movieData: movie.data.results });
        });
});


app.get("/search", (req, res) => {
    console.log(req.body);
    // const a = req.body.toString();
    console.log(req.query.searchInput);
    // console.log(a);

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=de-DE&query=${req.query.searchInput}&include_adult=false`)
        .then(movie => {
            res.render("index", { movieData: movie.data.results });
        });
});


app.listen(PORT, () => console.log(`Der Server lauscht ${PORT}`));;