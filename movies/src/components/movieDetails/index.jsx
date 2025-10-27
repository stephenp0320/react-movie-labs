import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { getAlternativeTitles, getSimilar } from "../../api/tmdb-api";
import { useEffect } from "react";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, credits }) => {
    //fixed issue with similar movies not displaying
    const [similarMovies, setSimilarMovies] = useState([]);
    const [alternativeTitles, setAlternativeTitles] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (movie.id) {
            getSimilar({ queryKey: ["similar", { id: movie.id }] }) //calls getSimilar function to find similr movies
                .then((data) => {
                    setSimilarMovies(data.results); //results from the api response
                })
                .catch((error) => {
                    console.error("Error fetching similar movies:", error);
                });
        }
    }, [movie.id]);


    useEffect(() => {
        if (movie.id) {
            getAlternativeTitles({ queryKey: ["alternativeTtiles", { id: movie.id }] }) //calls getSimilar function to find similr movies
                .then((data) => {
                    setAlternativeTitles(data.results); //results from the api response
                })
                .catch((error) => {
                    console.error("Error fetching similar movies:", error);
                });
        }
    }, [movie.id]);



    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper
                component="ul"
                sx={{ ...root }}
            >
                <li>
                    <Chip label="Genres" sx={{ ...chip }} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{ ...chip }} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={{ ...root }}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count})`}
                />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>


            <Paper component="ul" sx={{ ...root }}>
                <Chip label={`Production Countries `} color="primary" />
                {movie.production_countries && movie.production_countries.length > 0 && (
                    <Chip
                        label={` ${movie.production_countries.map((pc) => pc.name)}`}
                    />
                )}
            </Paper>


            <Paper component="ul" sx={{ ...root }}>
                <Chip label={`Directors `} color="primary" />
                {credits && credits.crew && (
                    <Chip
                        label={credits.crew.find((m) => m.job === "Director")?.name || "N/A"}
                    />
                )}
            </Paper>


            <Paper component="ul" sx={{ ...root }}>
                <Chip label={`Streaming providers `} color="primary" />
                {credits && credits.crew && (
                    <Chip
                        label={credits.crew.find((m) => m.job === "Providers")?.name || "N/A"}
                    />
                )}
            </Paper>

              {/*https://developer.themoviedb.org/reference/movie-credits*/}
              {/*returns cast name and character name else returns error message*/}  
            <Paper component="ul" sx={{ ...root }}>
                <Chip label={`Main actor`} color="primary" />
                {credits && credits.cast && credits.cast.length > 0 ? (
                    <Chip
                    label={`${credits.cast[0].name} (${credits.cast[0].character})`}
                    sx={{ ...chip }}
                    />
                ) : (
                    <Chip label="No main actor found" sx={{...Chip}}/>
                )}
            </Paper>
            

            <Paper component="ul" sx={{ ...root }}>
                <Chip label={`Alternative Titles`} color="primary" />
                {alternativeTitles && alternativeTitles.length > 0 ? (
                    alternativeTitles.map((alternativeTitles) => (
                        <Chip key={alternativeTitles.id} label={alternativeTitles.title} />
                    ))
                ) : (
                    <Chip label="No alternative titles found" />
                )}
            </Paper>




            <Paper component="ul" sx={{ ...root }}>
                <Chip label={`Similar Movies`} color="primary" />
                {similarMovies.length > 0 ? (
                    similarMovies.map((similarMovie) => (
                        <Chip key={similarMovie.id} label={similarMovie.title} />
                    ))
                ) : (
                    <Chip label="No similar movies found" />
                )}
            </Paper>



            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: '1em',
                    right: '1em'
                }}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews movie={movie} />
            </Drawer>

        </>
    );
};
export default MovieDetails;

