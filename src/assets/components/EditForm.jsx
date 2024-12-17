import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPet = () => {
  // State to store the list of pets
  const [pets, setPets] = useState([]);
  // State to store the selected pet (for editing)
  const [selectedPet, setSelectedPet] = useState(null);
  // State to store the form data
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    color: "",
    images: [],
  });
  // State to manage loading and error status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the list of pets from the backend
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5501/pets");
        setPets(response.data);
      } catch (err) {
        setError("Error fetching pets");
      }
    };

    fetchPets();
  }, []);

  // Handle pet selection for editing
  const handleSelectPet = (pet) => {
    setSelectedPet(pet); // Set the selected pet for editing
    setFormData({
      name: pet.name,
      breed: pet.breed,
      color: pet.color,
      images: pet.images,
    });
  };

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image input changes
  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      images: value.split(",").map((img) => img.trim()),
    }));
  };

  // Handle form submission (Update the pet data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPet) {
      setError("No pet selected for editing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:5501/pets/${selectedPet._id}`,
        formData
      );
      setLoading(false);
      alert("Pet updated successfully!");
      setSelectedPet(null); // Reset selected pet after successful update
      setFormData({
        name: "",
        breed: "",
        color: "",
        images: [],
      }); // Reset the form data
    } catch (err) {
      setLoading(false);
      setError("Failed to update pet data.");
    }
  };

  return (
    <div>
      <h2>Edit Pet Information</h2>

      {/* List of Pets */}
      <div>
        <h3>Pet List</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {pets.map((pet) => (
            <li key={pet._id}>
              {pet.name} - {pet.breed}
              <button onClick={() => handleSelectPet(pet)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Form (only visible if a pet is selected) */}
      {selectedPet && (
        <div>
          <h3>Edit Pet: {selectedPet.name}</h3>

          {loading && <p>Updating pet...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Breed:</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Color:</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Images (comma-separated URLs):</label>
              <input
                type="text"
                name="images"
                value={formData.images.join(", ")}
                onChange={handleImageChange}
              />
            </div>

            <button type="submit">Update Pet</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPet;

