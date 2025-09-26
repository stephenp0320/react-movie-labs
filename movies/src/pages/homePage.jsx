import React from "react";
import {Grid} from "@mui/material";

const HomePage = (props) => {
    const movies = props.movies;


    return (
        <Grid container>
            <Grid size = {12}>
                <h1>Home Page</h1>
            </Grid>
        </Grid>
    );
};

export default HomePage;
