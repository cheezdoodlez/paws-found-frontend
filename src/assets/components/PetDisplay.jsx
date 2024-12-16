import { useState, useEffect} from "react"
import PetSearch from './PetsSearch'

const PetDisplayPage = () => {
    const [formType, setFormType] = useState("adoption")
    const [pets, setPets] = useState([])
    const [filteredPets, setFilteredPets] = useState ([])
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
      // Check if pet.name exists and is a string before applying toLowerCase
      if (typeof pet.name === "string") {
        return pet.name.toLowerCase().includes(query);
      }
      console.warn("Invalid pet object (missing or non-string name):", pet);
      return false; // Exclude pets with invalid or missing names
    });
  
    setFilteredPets(results); // Update the filtered list
  }
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
        <div className="pet-list">
          {pets.length > 0 ? (
            pets.map((pet, index) => (
              <div key={index} className="pet-card">
                <h2>{pet.name}</h2>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Color:</strong> {pet.color}</p>
                <p><strong>Picture:</strong> {pet.images}</p> 
                 {/* {pet.image && (
                  <img src={pet.image} alt={`${pet.name}`} style={{ width: "150px", height: "150px" }} />
                )}  */}
                 {/* add back in when image functionality is wokring */}
                {formType === "missing" && (
                  <>
                    <p><strong>Last Seen Location:</strong> {pet.lastSeenLocation}</p>
                    <p><strong>Date Last Seen:</strong> {pet.dateLastSeen}</p>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No {formType === "adoption" ? "adoptable" : "missing"} pets available.</p>
          )}
        </div>
      )}
    </div>
  );
}


  export default PetDisplayPage


 
