import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action, isTv }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [minRating, setMinRating] = useState(0);
  const [minPopularity, setMinPopularity] = useState(0);
  const [sortKey, setSortKey] = useState("none");
  const genreId = Number(genreFilter);

  const get_title = (m) => (m.title ?? m.name ?? "")
  const maxPopularity = Math.max(1000, ...movies.map((m) => Number(m.popularity || 0)));

  let displayedMovies = movies
    .filter((m) => {
      return get_title(m).toLowerCase().includes(nameFilter.toLowerCase());
    })
    .filter((m) => {
      return genreId > 0 ? (m.genre_ids ?? []).includes(genreId) : true;
    })
    .filter((m) => Number(m.vote_average ?? 0) >= (minRating || 0))
    .filter((m) => Number(m.popularity || 0) >= (minPopularity || 0));


  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

  if (sortKey === "title") {
    displayedMovies = displayedMovies.sort((a, b) => {
      return get_title(a).localeCompare(get_title(b));
    });
  } else if (sortKey === "release_date") {
    displayedMovies = displayedMovies.sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    });
  } else if (sortKey === "popularity") {
    displayedMovies = displayedMovies.sort((a, b) => {
      return (b.popularity || 0) - (a.popularity || 0);
    });

  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortKey(value);
    else if (type === "minRating") setMinRating(Number(value));
    else if (type === "minPopularity") setMinPopularity(Number(value));
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>


        <Grid
          key="find"
          item
          xs={12}
          //https://mui.com/system/getting-started/the-sx-prop/
          sx={{ position: "relative",top: 10, zIndex: 5, width: "100vw", left: "50%", transform: "translateX(-50%)", px: 3, mb: 3,}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortKey={sortKey}
            isTv={isTv}
            minRating={minRating}
            minPopularity={minPopularity}
            maxPopularity={maxPopularity}
          />
        </Grid>


        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
