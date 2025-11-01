import React, { useEffect, useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import TvList from "../tvList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";


function TvListPageTemplate({ shows = [], title, action }) { // changed movies to shows =[] to default to empty array
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [minRating, setMinRating] = useState(0);
    const [minPopularity, setMinPopularity] = useState(0);
    const [sortKey, setSortKey] = useState("none");
    const genreId = Number(genreFilter);
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const get_title = (m) => (m.name ?? m.title ?? "")
    const maxPopularity = Math.max(1000, ...shows.map((m) => Number(m.popularity || 0)));

    let displayedShows = shows
        .filter((m) => {
            return get_title(m).toLowerCase().includes(nameFilter.toLowerCase());
        })
        .filter((m) => {
            return genreId > 0 ? (m.genre_ids ?? []).includes(genreId) : true;
        })
        .filter((m) => Number(m.vote_average ?? 0) >= (minRating || 0))
        .filter((m) => Number(m.popularity || 0) >= (minPopularity || 0));

    useEffect(() => {
        setPage(1);
    }, [nameFilter, genreFilter, minRating, minPopularity, sortKey]);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    if (sortKey === "title") {
        displayedShows = displayedShows.sort((a, b) => {
            return get_title(a).localeCompare(get_title(b));
        });
    } else if (sortKey === "popularity") {
        displayedShows = displayedShows.sort((a, b) => {
            return (b.popularity || 0) - (a.popularity || 0);
        });
    } else if (sortKey === "rating") { //sorts by decending order
        displayedShows = displayedShows.sort((a, b) => {
            return (b.vote_average || 0) - (a.vote_average || 0);
        });
    }

    // Math.ceil rounds up to the nearest integer
    // slice extracts a section of an array and returns it as a new array
    // from mdn web docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    const pageCnt = Math.ceil(displayedShows.length / pageSize);
    const pagedMovies = displayedShows.slice((page - 1) * pageSize, page * pageSize);

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
                    sx={{ position: "relative", top: 10, zIndex: 5, width: "100vw", left: "50%", transform: "translateX(-50%)", px: 3, mb: 3, }}
                >
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        sortKey={sortKey}
                        isTv={true}
                        minRating={minRating}
                        minPopularity={minPopularity}
                        maxPopularity={maxPopularity}
                    />
                </Grid>


                <TvList action={action} shows={pagedMovies}></TvList>

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
export default TvListPageTemplate;
