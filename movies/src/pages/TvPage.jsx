import React from "react";
import { getTv } from "../api/tmdb-api";
import TvListPageTemplate from "../components/TvListPageTemplate";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'
import Header from "../components/headerMovieList";
import TvList from "../components/tvList";
import { Container } from "@mui/material";
const TvPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['tv'],
    queryFn: () => getTv(1),
  })
  if (isPending) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }

  const shows = data?.results || [];

  // Redundant, but necessary to avoid app crashing.
  const favorites = shows.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <TvListPageTemplate
      title="TV Shows"
      shows={shows}
      action={(tv) => <AddToPlaylistIcon tv={tv} />}
    />
  );

};
export default TvPage;
