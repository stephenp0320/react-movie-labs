import { createTheme } from "@mui/material/styles";

//https://mui.com/material-ui/customization/theming/
const theme = createTheme({
  palette: {
    mode: "dark",
    //purple
    primary: { main: "#9c27b0" },
    //light purple   
    secondary: { main: "#ce93d8" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#bdbdbd" },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        //dark purple
        colorPrimary: { backgroundColor: "#4a148c" },
      },
    },
  },
});

export default theme;