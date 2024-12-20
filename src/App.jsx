import { useState, useEffect } from 'react'
import axios from 'axios'
import { ThemeProvider, CssBaseline, Box, Typography, Button } from "@mui/material";
import theme from "./theme"; // MUI Custom theme
import Navbar from "./assets/components/Navbar";
import { findPets, test } from './assets/services/Pets'
import PetForm from './assets/components/Form'
import PetDisplayPage from './assets/components/PetDisplay'


import PetSearch from './assets/components/PetsSearch'
import ContactForm from './assets/components/Contact'

import LoginForm from './assets/components/User'
import EditForm from './assets/components/EditForm';
import ReportFormEdit from './assets/components/ReportFormEdit';

const App = () => {
  const onSearch = (query) => findPets(query);




  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />


      {/* Navbar Section */}
      <Navbar />



      {/* Contact Form Section */}

      {/* Home Section */}
      <Box
        id="home"
        sx={{
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#f9f9f9", // Adds a light background
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Paws and Found
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Did you lose your pet? <br />
          Did you find a pet?
        </Typography>
      </Box>
        <div>
          <PetDisplayPage />
        </div>

      {/* Pet Search Section */}
      <Box
        id="search"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <PetSearch onSearch={onSearch} />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          onClick={test}
        >
          Test me
        </Button>
      </Box>

      {/* Adoption / Missing Form Section */}
      <Box
        id="Adopt"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Adds a subtle shadow
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Adoption / Missing Pet Form
        </Typography>
        <LoginForm>

          
          <PetForm />
          
          <EditForm /> 
          

         

            <ReportFormEdit />

        </LoginForm>
<ContactForm />
      </Box>
    </ThemeProvider>
  );
}

export default App;