import React, { useContext } from "react";
import PageTemplate from "../components/templateWatchList";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getWatchlist } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import WriteReview from "../components/cardIcons/writeReview";


const WatchlistPage = () => {
  const {watchlist: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchlistQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: () => getWatchlist(movieId),
      }
    })
  });

  // Check if any of the parallel queries is still loading.
  const isPending = watchlistQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = watchlistQueries
  .filter((q) => q.data)
  .map((q) => {
    const movie = q.data;
    movie.genre_ids = movie.genres ? movie.genres.map((g) => g.id) : [];
    return movie;
  });


  return (
    <PageTemplate
      title="User Watchlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlist movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );

};

export default WatchlistPage;
