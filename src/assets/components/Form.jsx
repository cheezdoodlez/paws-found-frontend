import { useState, useEffect } from 'react'


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
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
      const petData = {
        name: name,
        breed: breed,
        color: color,
        images: images,
        ...(formType === "missing" && {lastSeenLocation, DateLastSeen})
      };

      const endpoint = formType === "adoption" 
      ? "http://localhost:5501/pets"
      : "http://localhost:5501/report";
  
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Tell the server that we're sending JSON data
          },
          body: JSON.stringify(petData), // Send the data as a JSON string
        });
  
        if (response.ok) {
          alert(`${formType === "adoption" ? "Pet added for adoption!" : "Missing pet reported!"}`);
          // makes alert dynamic to which form we are submitting
          // Reset form fields after a successful submission
          setName('');
          setBreed('');
          setColor('');
          setImages('');
          setLastSeenLocation('')
          setDateLastSeen ('')
          
        } else {
          alert("Error adding pet. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };
  
    return (
      <div>
      {/* Toggle between adoption and missing pet form */}
      <div>
        <label htmlFor="formType">Form Type:</label>
        <select
          id="formType"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        >
          <option value="adoption">Adoption</option>
          <option value="missing">Missing</option>
        </select>
      </div>

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
          value={images}
          onChange={(e) => setImages(e.target.value)} // Update state as the user types
        />
         {formType === "missing" && (
          <>
            <label htmlFor="lastSeenLocation">Last Seen Location</label>
            <input
              id="lastSeenLocation"
              type="text"
              value={lastSeenLocation}
              onChange={(e) => setLastSeenLocation(e.target.value)} // Update state as the user types, only for missing
            />

            <label htmlFor="dateLastSeen">Date Last Seen</label>
            <input
              id="dateLastSeen"
              type="date"
              value={dateLastSeen}
              onChange={(e) => setDateLastSeen(e.target.value)} // Update state as the user types, only for missing
            />
          </>
        )}
  
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  };
  
  export default PetForm;
  