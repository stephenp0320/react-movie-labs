import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'



const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })
  const { data: creditsData, creditsError, creditsIsPending, creditsIsError  } = useQuery({
    queryKey: ['moviecredits', {id: id}],
    queryFn: getMovieCredits,
  })

  if(isPending) {
    return <Spinner />;
  }

  if(isError) {
    return <h1>{error.message}</h1>;
  }

  if(creditsIsPending) {
    return <Spinner/>;
  }

  if(creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} credits={creditsData} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
