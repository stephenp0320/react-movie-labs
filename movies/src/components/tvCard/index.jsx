import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Grid } from "@mui/material";
import img from '/Users/stephenpower/Desktop/year4/web_app_two/react-movie-labs/movies/src/components/images/film-poster-placeholder.png'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Avatar from '@mui/material/Avatar';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import TranslateIcon from '@mui/icons-material/Translate';
export default function TvCard({ tv, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  const isFav = favorites.find((id) => id === tv.id) != null;

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(tv);
  };



  return (
    <Card sx={{
      borderRadius: 5,
      boxShadow: "0 8px 16px 0 #000000",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 12px 24px 0 #aa00ff",
      },

    }}>
      <CardHeader
        avatar={
          isFav ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {tv.name}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 500 }}
        image={
          tv.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {" "}{tv.first_air_date ?? "N/A"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <LocalFireDepartmentIcon fontSize="small" />
              {" "}{tv.popularity ?? "N/A"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <ThumbUpOffAltIcon fontSize="small" />
              {" "}{tv.vote_count ?? "N/A"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <TranslateIcon fontSize="small" />
              {" "}{tv.original_language ?? "N/A"}
            </Typography>
          </Grid>



          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <ThumbUpIcon fontSize="small" />
              {"  "} {Math.round(tv.vote_average * 10)}{"%"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>




      </CardActions>

    </Card>
  );
}

