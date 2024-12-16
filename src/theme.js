import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FF6BAE", // Vibrant pink
        },
        secondary: {
            main: "#1ECBE1", // Bright teal
        },
        error: {
            main: "#FFB347", // Orange (for warnings or errors)
        },
        background: {
            default: "#F7F9FC", // Light gray for backgrounds
            paper: "#FFFFFF", // White for cards and content areas
        },
        text: {
            primary: "#333333", // Dark gray for main text
            secondary: "#555555", // Lighter gray for secondary text
        },
    },

    typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
        fontSize: "3rem",
        fontWeight: 700,
        color: "#FF6BAE", // Vibrant pink
    },
    h2: {
        fontSize: "2.5rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        color: "#555555", // Lighter gray
      },
    },

    shape: { //controls the roundness of components that support rounded corners
      borderRadius: 8, // Rounded corners for buttons and cards
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none", // No uppercase letters on buttons
              fontWeight: 600,
            },
          },
        },
      },
    });

    export default theme;