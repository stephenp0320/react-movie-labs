import React from "react";
import { getRecommendations } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'


const RecommendationsPage = (props) => {

    const {id} = useParams();
    const num_id = Number(id);

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['recommendations', num_id],
    queryFn: () => getRecommendations(num_id),
    enabled: Number.isFinite(num_id) && num_id > 0 //only runs this query if num_id is valid num greater than 0
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
    <PageTemplate
      title="Recommended Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
);

};
export default RecommendationsPage;
