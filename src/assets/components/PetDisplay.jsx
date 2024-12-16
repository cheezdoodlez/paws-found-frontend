import { useState, useEffect} from "react"
import PetSearch from './PetsSearch'
import PetCard from './PetCard'

const PetDisplayPage = () => {
    const [formType, setFormType] = useState("adoption")
    const [pets, setPets] = useState([])
    const [filteredPets, setFilteredPets] = useState ([])
    const [selectedPets, setSelectedPets] = useState (null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


// Step 2: Fetch data based on form type
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
        if (!response.ok) {
          throw new Error("Failed to fetch pet data");
        }
        const data = await response.json();
        setPets(data); // Update state with fetched data
        setFilteredPets(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [formType]); // Re-fetch data whenever formType changes


   // Handle search
   const handleSearch = (searchQuery) => {  
    const query = searchQuery.toLowerCase();
    const results = pets.filter((pet) => {
      if (typeof pet.name === "string") {
        return pet.name.toLowerCase().includes(query);
      }
      console.warn("Invalid pet object (missing or non-string name):", pet);
      return false; // Exclude pets with invalid or missing names
    });
  
    setFilteredPets(results); // Update the filtered list
  }

  const handleCardClick = (pet) => {
    setSelectedPets(pet)
  }

  const handleBackToList = () => {
    setSelectedPets(null)
  }

  const handleDelete = async (petId) => {
    const endpoint =
      formType === "adoption"
        ? `http://localhost:5501/pets/${petId}` // DELETE endpoint for adoption pets
        : `http://localhost:5501/report/${petId}`; // DELETE endpoint for missing pets

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to relinquish pet.");
      }

      // Remove the deleted pet from state
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
      setFilteredPets((prevFilteredPets) =>
        prevFilteredPets.filter((pet) => pet.id !== petId)
      );

      // Return to the list view
      alert("This pet has been claimed!");
      setSelectedPets(null);
    } catch (err) {
      alert(`Error deleting pet: ${err.message}`);
    }
  };
  // Step 3: Render the data
  return (
    <div>
      {/* Toggle for adoption and missing pets */}
      <div>
        <label htmlFor="formType">View:</label>
        <select
          id="formType"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        >
          <option value="adoption">Adoptable Pets</option>
          <option value="missing">Missing Pets</option>
        </select>
      </div>


      <PetSearch onSearch={handleSearch}/>

      {/* Loading and Error states */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Display pet data */}
      {!loading && !error && (
       <div>
       {/* If a pet is selected, show detailed view */}
       {selectedPets ? (
         <div className="pet-details">
           <button onClick={handleBackToList}>Back to List</button>
           <h2>{selectedPets.name}</h2>
           <img
             src={selectedPets.image}
             alt={selectedPets.name}
             style={{ width: "300px", height: "300px", objectFit: "cover" }}
           />
           <p>
             <strong>Breed:</strong> {selectedPets.breed}
           </p>
           <p>
             <strong>Color:</strong> {selectedPets.color}
           </p>
           {formType === "missing" && (
             <>
               <p>
                 <strong>Last Seen Location:</strong>{" "}
                 {selectedPets.lastSeenLocation}
               </p>
               <p>
                 <strong>Date Last Seen:</strong> {selectedPets.dateLastSeen}
               </p>
               <button onClick={() => handleDelete(selectedPets._id)}>
                    Found
                  </button>
             </>
           )}
           {formType === "adoption" && (
                <button onClick={() => handleDelete(selectedPets._id)}>
                  Adopted
                </button>
              )}
         </div>
       ) : (
         // Show grid of pet cards if no pet is selected
         <div className="pet-list" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
           {filteredPets.map((pet, index) => (
             <PetCard key={index} pet={pet} onClick={handleCardClick} />
           ))}
         </div>
       )}
     </div>
   )}
 </div>
);
};


  export default PetDisplayPage


 
