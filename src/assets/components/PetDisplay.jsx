import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import { Box, Typography, Button, Paper } from "@mui/material";
import PetSearch from "./PetsSearch";
import Grid from '@mui/material/Grid'; // Correct import

const PetDisplayPage = () => {
  const [formType, setFormType] = useState("adoption");
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pets
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);

      const endpoint =
        formType === "adoption"
          ? "http://localhost:5501/pets"
          : "http://localhost:5501/report";

      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch pet data");

        const data = await response.json();
        setPets(data);
        setFilteredPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [formType]);

  // Handle pet selection
  const handleCardClick = (pet) => {
    setSelectedPet(pet);
  };

  // Handle deletion
  const handleDelete = async (petId) => {
    const endpoint =
      formType === "adoption"
        ? `http://localhost:5501/pets/${petId}`
        : `http://localhost:5501/report/${petId}`;

    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete pet");

      setPets((prev) => prev.filter((pet) => pet._id !== petId));
      setFilteredPets((prev) => prev.filter((pet) => pet._id !== petId));
      setSelectedPet(null);
      alert("Pet has been deleted successfully.");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <Box p={3}>
      {/* Logo Image Centered at the Top */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={3} // Adds margin below the logo
      >
        <img
          src="src/assets/images/logo.png" // Replace with your actual logo path
          alt="Logo"
          style={{ width: "950px", height: "auto" }} // Adjust size as needed
        />
      </Box>

      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {formType === "adoption" ? "Adoptable Pets" : "Missing Pets"}
      </Typography>

      {/* Form Toggle */}
      <select
        value={formType}
        onChange={(e) => setFormType(e.target.value)}
        style={{ marginBottom: "1rem" }}
      >
        <option value="adoption">Adoptable Pets</option>
        <option value="missing">Missing Pets</option>
      </select>

      {/* Search */}
      <PetSearch
        onSearch={(query) =>
          setFilteredPets(
            pets.filter((pet) =>
              pet.name.toLowerCase().includes(query.toLowerCase())
            )
          )
        }
      />

      {/* Loading/Error */}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Pet Display */}
      {selectedPet ? (
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            {selectedPet.name}
          </Typography>
          <img
            src={selectedPet.image}
            alt={selectedPet.name}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              marginBottom: "1rem",
              borderRadius: "8px",
            }}
          />
          <Typography>Breed: {selectedPet.breed}</Typography>
          <Typography>Color: {selectedPet.color}</Typography>
          {formType === "missing" && (
            <>
              <Typography>
                Last Seen Location: {selectedPet.lastSeenLocation}
              </Typography>
              <Typography>
                Date Last Seen: {selectedPet.dateLastSeen}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(selectedPet._id)}
            sx={{ mt: 2 }}
          >
            {formType === "adoption" ? "Adopted" : "Delete"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setSelectedPet(null)}
            sx={{ mt: 2, ml: 2 }}
          >
            Back
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredPets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet._id}>
              <PetCard
                pet={pet}
                onClick={() => handleCardClick(pet)}
                selected={selectedPet?._id === pet._id}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PetDisplayPage;
