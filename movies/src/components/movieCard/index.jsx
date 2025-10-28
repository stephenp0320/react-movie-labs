import React, { useContext  } from "react";
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
import StarRateIcon from "@mui/icons-material/StarRate";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import img from '/Users/stephenpower/Desktop/year4/web_app_two/react-movie-labs/movies/src/components/images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import ExplicitIcon from '@mui/icons-material/Explicit';


export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
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
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>

          {/* https://api.themoviedb.org/3/discover/movie?api_key=YOUR_KEY&include_adult=true&page=1 */}
          {/* check to ensure adult boolean works*/}

          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <ExplicitIcon fontSize="small" />
              {movie.adult ? " yes" : " no"}
            </Typography>
          </Grid>

          {/* <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <ExplicitIcon fontSize="small" />
              {movie.credit}
            </Typography>
          </Grid> */}


          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <ThumbUpIcon fontSize="small" />
              {"  "} {Math.round(movie.vote_average * 10)}{"%"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      
      {action(movie)}
    
      <Link to={`/movies/${movie.id}`}>
        <Button variant="outlined" size="medium" color="primary">
          More Info
        </Button>
      </Link>

      <Link to={`/movies/${movie.id}/reviews`}>
        <Button variant="outlined" size="medium" color="error" sx={{ marginLeft: 1 }}>
          Reviews
        </Button>
      </Link>
      
    </CardActions>

    </Card>
  );
}

