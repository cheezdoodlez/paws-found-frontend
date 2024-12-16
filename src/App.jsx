// import { useState, useEffect } from 'react'
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material"; // Applies MUI theme globally
import theme from "./theme"; // Imports the custom theme
import Navbar from "./assets/components/Navbar";
import PetSearch from "./assets/components/PetsSearch";
import PetForm from "./assets/components/Form";
import { findPets, test } from "./assets/services/Pets";


const App = () => {
      const onSearch = (query) => findPets(query)

      return (
            <ThemeProvider theme={theme}>
                  <CssBaseline /> {/* Resets browser default styles */}

                  {/* Navbar Section */}
                  <Navbar /> {/* Add Navbar at the top */}
                  <div id="home" style={{ padding: "2rem" }}>
                        <h1>Paws and Found</h1>
                        <h2>
                              Did you lose your pet? <br />
                              Did you find a pet? <br />
                        </h2>
                  </div>

                  {/*Pet Search Section*/}
                  <div id="search" style={{ marginBottom: "2rem" }}>
                        <PetSearch onSearch={onSearch} />
                        <button onClick={test}>Test me</button>
                  </div>

                  {/* Adoption Form/Missing Form Section */}
                  <div id="Adopt">
                        <h1>Adoption / Missing Pet Form</h1>
                        <PetForm />
                  </div>
            </ThemeProvider>
            );
      };

                  //will start making forms when we have more structure for backend
                  // toggling between lists for indexing data
                  export default App
