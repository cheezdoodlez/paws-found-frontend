import { useState, useEffect } from "react";
import { Box, TextField, Button, Select, MenuItem, Typography } from "@mui/material";


const PetForm = () => {


    // Step 1: Declare state variables for each field
    const [formType, setFormType] = useState("adoption")
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [images, setImages] = useState("");
    const [lastSeenLocation, setLastSeenLocation] = useState("")
    const [dateLastSeen, setDateLastSeen] = useState("")

    // Step 2: Handle form submission
    const handleSubmit = async (e) => {  // the handleSubmit function is an asynchronous function that takes an event object as an argument (e) and is triggered when the form is submitted (when the user clicks the submit button)
          e.preventDefault();   // This e.preventDefault() method prevents the default behavior of the form submission, which is to reload the page

      const petData = { // This variable petData is an object that contains the data from the form fields (name, breed, color, image, lastSeenLocation, dateLastSeen)
        name: name,
        breed: breed,
        color: color,
        images: images,
        ...(formType === "missing" && {lastSeenLocation, DateLastSeen}),
        image: image,
        ...(formType === "missing" && { lastSeenLocation, dateLastSeen})// This is a conditional spread operator that says if the default formType is "missing", then include the lastSeenLocation and dateLastSeen fields in the petData object
      };

      const endpoint =
        formType === 'adoption'// This is the variable that is used to determine the endpoint, also known as
          ? "http://localhost:5501/pets"  // this will be the endpoint for the adoption form
          : "http://localhost:5501/report";  // this will be the endpoint for the missing pet form

      try { // this is a try...catch block to handle errors
         const response = await fetch(endpoint, { // Creating a function to send data to the server using fetch API and async/await
          method: "POST", //This is a POST request to send data to the server
          headers: { // This tells the server that we are sending JSON data in the request body and not a form submission with key-value pairs like a query string or form data (application/x-www-form-urlencoded)
            "Content-Type": "application/json"}, // This is the MIME type for JSON data (like text/html for HTML)
          body: JSON.stringify(petData), //This is the data we are sending to the server. We need to convert the object to a JSON string
        });

        if (response.ok) { //This checks if the response status code is in the 200 range
          alert(
            `${formType === "adoption"
               ? "Pet added for adoption!"
               : "Missing pet reported!"
              }`
            );
          // makes alert dynamic to which form we are submitting

          // Reset form fields
          setName(''); //This resets the name field to an empty string
          setBreed(''); //This resets the breed field to an empty string
          setColor(''); //This resets the color field to an empty string
          setImages(''); //This resets the image field to an empty string
          setLastSeenLocation('') //This resets the lastSeenLocation field to an empty string
          setDateLastSeen ('')  //This resets the dateLastSeen field to an empty string

        } else { //This is for any other response status code that is not in the 200 range
          alert("Error adding pet. Please try again."); //This is an alert message that tells the user if the submission was not successful
        }
      } catch (error) {  //This is the catch block that handles any errors that occur in the try block
        console.error("Error:", error); //This logs the error to the console
        alert("Something went wrong. Please try again."); //This is an alert message that tells the user if there was an error
      }
    };

    return (  // Step 3: Create the form with input fields and a submit

    <Box // This is a Box component from Material-UI that acts as a container for the form
        component="form" //creates a form element which is used to collect user input
        onSubmit={handleSubmit} //This is the event handler that triggers the handleSubmit function when the form is submitted
        sx={{  //In MUI sx is a prop that allows you to style components using the theme object so this allows us to use the Material-UI theme to style the form
        display: "flex",
        flexDirection: "column", //
        gap: 2,
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        maxwidth: 400,
        margin: "auto",
      }}
    >
    {   /* Form Title */}
      <Typography variant="h5" textAlign="center">
        {formType === "adoption" ? "Adoption Form" : "Missing Pet Form"}
      </Typography>

         {  /* Form Type Selector */}
      {/* The following line of code creates a dropdown menu for selecting the form type */}
      <Select
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
          fullWidth
      >
          {/* The following line of code creates the options for the dropdown menu */}
          <MenuItem value="adoption">Adoption</MenuItem>
          {/* The following line of code creates the options for the dropdown menu */}
          <MenuItem value="missing">Missing</MenuItem>
      </Select>

       {/* Name Input */}
      {/* The following line of code creates an input field for the name of the pet */}
      <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

      {/* Breed Input */}
      <TextField
        label="Breed"
        variant="outlined"
        fullWidth
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      />

      {/* Color Input */}
      <TextField
        label="Color"
        variant="outlined"
        fullWidth
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      {/* Image Input */}
      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        value={images}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* Additional Fields for Missing Pets */}
      {formType === "missing" && (
        <>
          <TextField
            label="Last Seen Location"
            variant="outlined"
            fullWidth
            value={lastSeenLocation}
            onChange={(e) => setLastSeenLocation(e.target.value)}
          />
          <TextField
            label="Date Last Seen"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dateLastSeen}
            onChange={(e) => setDateLastSeen(e.target.value)}
          />
        </>
      )}

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default PetForm;
