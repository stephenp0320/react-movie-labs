import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";


const UpcomingMoviesPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'],
    queryFn: () => getUpcomingMovies(1),
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
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "16px" }}>
        <Link underline="hover" href="/">Home</Link>
        <Link underline="hover" href="/movies">Movies</Link>
        <Typography color="text.primary">Upcoming Movies</Typography>
      </Breadcrumbs>
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
    </>
  );

};
export default UpcomingMoviesPage;
