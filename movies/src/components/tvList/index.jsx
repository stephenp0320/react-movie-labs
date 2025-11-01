import React from "react";
import Tv from "../tvCard/";
import { Grid } from "@mui/material";

const TvList = (props) => {
    const shows = props.shows;
    let tvcards = shows.map((tv) => (
                <Grid key={tv.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
                    <Tv tv={tv} action={props.action} />
                </Grid>
            ));
    
    return tvcards;
};
export default TvList;
