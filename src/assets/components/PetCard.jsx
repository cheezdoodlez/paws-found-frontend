import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

const PetCard = ({ pet, onClick, onAction }) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: 3,
        borderRadius: 2,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
      onClick={() => onClick(pet)} // Call the onClick function with pet data
    >
      {/* Pet Image */}
      <CardMedia
        component="img"
        height="200"
        image={pet.image || "https://via.placeholder.com/200"} // Fallback image
        alt={pet.name}
        sx={{ objectFit: "cover" }}
      />

      {/* Pet Details */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Breed: {pet.breed}
        </Typography>
        <Box mt={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onAction(pet._id);
            }}
            sx={{ mr: 1 }}
          >
            {pet.isAdopted ? "Relinquish" : "Adopt"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetCard;
