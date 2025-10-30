import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action, isTv }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortKey, setSortKey] = useState("none");
  const genreId = Number(genreFilter);

  const get_title = (m) => (m.title ?? m.name ?? "")

  let displayedMovies = movies
    .filter((m) => {
      return get_title(m).toLowerCase().includes(nameFilter.toLowerCase());
    })
    .filter((m) => {
      return genreId > 0 ? (m.genre_ids ?? []).includes(genreId) : true;
    });

  
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

  if (sortKey === "title") {
    displayedMovies = displayedMovies.sort((a, b) => {
      return get_title(a).localeCompare(get_title(b));
    });
  } else if (sortKey === "release_date") {
    displayedMovies = displayedMovies.sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    });
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else  if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortKey(value);
  };

  return (
    <Grid container direction="column" spacing={2} sx={{ padding: "20px" }}>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortKey={sortKey}
            isTv={isTv}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} isTv={isTv}/>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
