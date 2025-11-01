import React, { useEffect, useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function WatchListPageTemplate({ movies, title, action, isTv }) {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const get_title = (m) => (m.title ?? m.name ?? "")

  const sortedMovies = [...movies].sort((a, b) =>
    get_title(a).localeCompare(get_title(b))
  );

  const pageCnt = Math.ceil(sortedMovies.length / pageSize);
  const pagedMovies = sortedMovies.slice((page - 1) * pageSize, page * pageSize);


  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <MovieList action={action} movies={pagedMovies}></MovieList>

        {/* https://mui.com/material-ui/react-pagination/ */}
        {pageCnt > 1 && (
          <Pagination
            count={pageCnt}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ m: 2, mx: "auto" }}
          />
        )}
      </Grid>
    </Grid>
  );
}
export default WatchListPageTemplate;
