import React from "react";
import { getPopularMovies } from "../api/tmdb-api";
import MovieList from "../components/movieList";
import Header from "../components/headerMovieList";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import Container from "@mui/material/Container";
import { Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const PopularMoviesPage = (props) => {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['popular'],
        queryFn: () => getPopularMovies(1),
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    return (
        <Container sx={{
            mt: 10,
            mb: 4,
            py: 2,
            minHeight: '80vh',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 5,
            boxShadow: '0 8px 16px 0 #000000',

        }}>
            <>
                <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "16px" }}>
                    <Link underline="hover" href="/">Home</Link>
                    <Link underline="hover" href="/movies">Movies</Link>
                    <Typography color="text.primary">Popular Movies</Typography>
                </Breadcrumbs>
                <Header title="Popular Movies" />
                <MovieList movies={movies} action={() => <></>} />
            </>
        </Container>
    );

};
export default PopularMoviesPage;
