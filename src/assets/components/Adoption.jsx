import { useState, useEffect } from 'react'


const AdoptionForm = () => {
    // Step 1: Declare state variables for each field
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState("");
  
    // Step 2: Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
      const petData = {
        name: name,
        breed: breed,
        color: color,
        image: image,
      };
  
      try {
        const response = await fetch("http://localhost:5501/pets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Tell the server that we're sending JSON data
          },
          body: JSON.stringify(petData), // Send the data as a JSON string
        });
  
        if (response.ok) {
          alert("Pet added successfully!");
          // Reset form fields after a successful submission
          
        } else {
          alert("Error adding pet. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };
  
    return (
      <form className="petInfo" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update state as the user types
        />
  
        <label htmlFor="breed">Breed</label>
        <input
          id="breed"
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)} // Update state as the user types
        />
  
        <label htmlFor="color">Color</label>
        <input
          id="color"
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)} // Update state as the user types
        />
  
        <label htmlFor="image">Picture</label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)} // Update state as the user types
        />
  
        <input type="submit" value="Submit" />
      </form>
    );
  };
  
  export default AdoptionForm;
  