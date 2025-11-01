import React from "react";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import MovieReviews from "../components/movieReviews";

//help from these resources for the fix
//https://api.reactrouter.com/v7/functions/react_router.useLocation.html
const MovieReviewPage = () => {
  const location = useLocation();
  let content;
  const { movie, review } = location.state || {};

  if (review) {
    content = <MovieReview review={review} />;
  } else {
    content = <MovieReviews movie={movie} />;
  }
  return (
    <PageTemplate movie={movie}>{content}</PageTemplate>
  );
};

export default MovieReviewPage;