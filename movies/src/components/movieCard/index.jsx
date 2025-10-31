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
import { Grid, Stack } from "@mui/material";
import img from '/Users/stephenpower/Desktop/year4/web_app_two/react-movie-labs/movies/src/components/images/film-poster-placeholder.png'
import { Link, useNavigate } from "react-router";
import Avatar from '@mui/material/Avatar';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import NoAdultContentIcon from '@mui/icons-material/NoAdultContent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from "react";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const navigate = useNavigate();

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
    setOpen(true);
  };

  const handleReviewClick = (e) => {
    e.preventDefault();
    handleOpen();
    setTimeout(() => navigate(`/movies/${movie.id}/reviews`, { state: { movie } }), 600);
  }

  const handleMoreInfoClick = (e) => {
    e.preventDefault();
    handleOpen();
    setTimeout(() => navigate(`/movies/${movie.id}`, { state: { movie } }), 600);
  }

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-GB') : "-");



  return (
    <Card sx={{
      borderRadius: 5,
      boxShadow: "0 8px 16px 0 #000000",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 12px 24px 0 #6a0707",
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
        <Grid container spacing={1.5}>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarIcon fontSize="small" />
            <Typography variant="body2">{fmtDate(movie.release_date)}</Typography>
            </Stack>
          </Grid>

          {/* https://api.themoviedb.org/3/discover/movie?api_key=YOUR_KEY&include_adult=true&page=1 */}
          {/* check to ensure adult boolean works*/}

          <Grid item xs={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">
              <NoAdultContentIcon fontSize="small" />
              {movie.adult ? " yes" : " no"}
            </Typography>
            </Stack>
          </Grid>


          <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">
              <ThumbUpIcon fontSize="small" />
              {"  "} {Math.round(movie.vote_average * 10)}{"%"}
            </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">
              <HowToVoteIcon fontSize="small" />
              {"  "}{movie.vote_count || "Unknown"} votes
            </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">
              <WhatshotIcon fontSize="small" />
              Popular:{"  "}{movie.popularity || "Unknown"}
            </Typography>
            </Stack>
          </Grid>
          
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      
      {action(movie)}
    
      {/* https://mui.com/material-ui/react-snackbar/ */}
      {/* added snackbar to show when more info and review buttons are clicked */}

      <Link to={`/movies/${movie.id}`}>
        <Button onClick={handleMoreInfoClick} variant="outlined" size="medium" color="primary">
          More Info
        </Button>
      </Link>

      <Link to={`/movies/${movie.id}/reviews`} state={{ movie }}>
        <Button onClick={handleReviewClick} variant="outlined" size="medium" color="error" sx={{ marginLeft: 1 }}>
          Reviews
        </Button>
      </Link>
      
    </CardActions>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          You clicked the review button!
        </Alert>
      </Snackbar>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          You clicked the more info button!
        </Alert>
      </Snackbar>

    </Card>
  );
}

