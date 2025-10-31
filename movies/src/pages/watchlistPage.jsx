import React, { useContext } from "react";
import PageTemplate from "../components/templateWatchList";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getWatchlist } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";


const WatchlistPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['watchlist', { id: movieId }],
        queryFn: () => getWatchlist(movieId),
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = favoriteMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries
  .filter((q) => q.data)
  .map((q) => {
    const movie = q.data;
    movie.genre_ids = movie.genres ? movie.genres.map((g) => g.id) : [];
    return movie;
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="User Watchlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );

};

export default WatchlistPage;
