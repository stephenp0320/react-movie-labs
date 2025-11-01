import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [movieMenuAnchor, setMovieMenuAnchor] = useState(null);

  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    //{ label: "Popular", path: "/movies/popular" },
    { label: "Watchlist", path: "/watchlist/movies" },
  ];


  const subMenuOptions = [
    { label: "Now Playing", path: "/movies/nowplaying" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Tv", path: "/movies/Tv" },
    { label: "Upcoming", path: "/movies/upcoming" },
   
  ]

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    setMovieMenuAnchor(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenMovieMenu = (event) => setMovieMenuAnchor(event.currentTarget);
  const handleCloseMovieMenu = () => setMovieMenuAnchor(null);

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
              color: 'white',
              textShadow: '0 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            TMDB <span style={{ color: '#a80b0b' }}>Chronicles</span>
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {/* added a side bar to the nav */}
                {[...menuOptions, ...subMenuOptions].map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button sx={{
                  marginRight: 2,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  '&:hover': {
                    //backgroundColor: '#aa00ff',
                    transform: 'scale(1.1)',
                  }

                }}
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}

              {/*https://mui.com/material-ui/react-menu/*/}
              {/* added a drop down menu */}
              <Button color="inherit" onClick={handleOpenMovieMenu}>
                <MenuIcon>Movies</MenuIcon>
              </Button>
              <Menu
                anchorEl={movieMenuAnchor}
                open={Boolean(movieMenuAnchor)}
                onClose={handleCloseMovieMenu}
              >
                {subMenuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
