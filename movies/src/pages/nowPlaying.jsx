import React from "react";
import { getNowPlaying } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import { Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const NowPlaying = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: () => getNowPlaying(1),
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
        <Typography color="text.primary">Now Playing</Typography>
      </Breadcrumbs>
      <PageTemplate
        title="Movies Now Playing in theaters"
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToWatchlistIcon movie={movie} />
          </>
        )}
      />
    </>
  );

};
export default NowPlaying;
