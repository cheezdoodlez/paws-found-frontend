import React from "react";

const PetCard = ({ pet, onClick }) => {
  return (
    <div className="pet-card" onClick={() => onClick(pet)}>
      <img
        src={pet.image}
        alt={pet.name}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
      <h3>{pet.name}</h3>
    </div>
  );
};

export default PetCard;
