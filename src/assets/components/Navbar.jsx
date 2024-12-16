import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import logo from "/src/assets/images/skinny_logo.png" // Replace with your actual logo path

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#FF6BAE" }}>
      <Toolbar>
        {/* Logo and App Title */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src={logo}
            alt="Paws & Found Logo"
            style={{ height: "60px", marginRight: "10px" }}
          />
          <Typography variant="h6" fontWeight="bold">
            Paws & Found
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
