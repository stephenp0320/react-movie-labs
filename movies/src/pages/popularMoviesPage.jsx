import React from "react";
import { getPopularMovies } from "../api/tmdb-api";
//import PageTemplate from '../components/templateMovieListPage';
import MovieList from "../components/movieList";
import Header from "../components/headerMovieList";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'


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
    const addToFavorites = (movieId) => true

    return (
        <>
            <Header title="Popular Movies" />
            <MovieList movies={movies} action={(movie) => <AddToPlaylistIcon movie={movie} />} />
        </>
    );

};
export default PopularMoviesPage;
