import React from "react";
import Tv from "../tvCard";
import { Grid } from "@mui/material";

const TvList = (props) => {
  return props.movies.map((m) => (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Tv tv={m} action={props.action} /> 
    </Grid>
  ));
};

export default TvList;