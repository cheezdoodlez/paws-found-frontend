import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, // Container component for layout and spacing
  Typography, // For headings and text
  TextField, // Material-UI styled input fields
  Button, // Styled button component
  Paper, // Card-like container with shadow
    CircularProgress, // Loading spinner
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from '@mui/material/Grid';


const EditPet = () => {
  /** =======================
   * STATE DEFINITIONS
   * ======================== */
  const [pets, setPets] = useState([]); // State to store the list of pets
  const [selectedPet, setSelectedPet] = useState(null); // State to store the pet being edited
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    color: "",
    images: [],
  }); // State for form input values
  const [loading, setLoading] = useState(false); // Loading state for the update process
  const [error, setError] = useState(null); // State for error messages

  /** =======================
   * FETCH PETS FROM BACKEND
   * ======================== */
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5501/pets");
        setPets(response.data);
      } catch (err) {
        setError("Error fetching pets.");
      }
    };

    fetchPets();
  }, []);

  /** =======================
   * HANDLE EVENTS
   * ======================== */
  // Select a pet for editing and pre-fill the form
  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setFormData({
      name: pet.name,
      breed: pet.breed,
      color: pet.color,
      images: pet.images,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for the images field (comma-separated input)
  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      images: value.split(",").map((img) => img.trim()),
    }));
  };

  // Handle form submission to update the pet
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPet) {
      setError("No pet selected for editing.");
      return;
    }

    setLoading(true); // Show loading spinner
    setError(null); // Clear any previous errors

    try {
      await axios.put(
        `http://localhost:5501/pets/${selectedPet._id}`,
        formData
      );
      setLoading(false); // Hide loading spinner
      alert("Pet updated successfully!");

      // Reset form and selected pet
      setSelectedPet(null);
      setFormData({
        name: "",
        breed: "",
        color: "",
        images: [],
      });
    } catch (err) {
      setLoading(false);
      setError("Failed to update pet data.");
    }
  };

  /** =======================
   * COMPONENT RENDERING
   * ======================== */
  return (
    <Box p={3}>
      {/* Main Heading */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Pet Information
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* LEFT COLUMN: Pet List */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" gutterBottom>
            Pet List
          </Typography>

          <Paper elevation={3} sx={{ p: 2 }}>
            <List>
              {pets.map((pet) => (
                <ListItem
                  key={pet._id}
                  divider
                  secondaryAction={
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleSelectPet(pet)}
                      sx={{
                        textTransform: "none",
                        borderRadius: "8px",
                      }}
                    >
                      Edit
                    </Button>
                  }
                >
                  {/* Pet Name and Breed */}
                  <ListItemText
                    primary={pet.name}
                    secondary={`Breed: ${pet.breed}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: Edit Form */}
        <Grid item xs={12} md={7}>
          {selectedPet ? (
            <Paper elevation={3} sx={{ p: 3 }}>
              {/* Edit Form Title */}
              <Typography variant="h5" gutterBottom>
                Editing: {selectedPet.name}
              </Typography>

              {/* Loading Indicator */}
              {loading && (
                <Box display="flex" justifyContent="center" mb={2}>
                  <CircularProgress />
                </Box>
              )}

              {/* Edit Form */}
              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

                {/* Breed Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  required
                />

                {/* Color Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                />

                {/* Images Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Images (comma-separated)"
                  name="images"
                  value={formData.images.join(", ")}
                  onChange={handleImageChange}
                />

                {/* Form Buttons */}
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    Update Pet
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setSelectedPet(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Paper>
          ) : (
            <Typography>Select a pet to edit.</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditPet;
