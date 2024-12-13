import { useState, useEffect } from 'react'
import axios from 'axios'
import { findPets, test } from './assets/services/Pets'
import './App.css'
import PetSearch from './assets/components/PetsSearch'


const App = () => {
  const onSearch = (query) => findPets(query)
  return (
    <>
    <PetSearch onSearch={onSearch}/>
        <button onClick={test}>Test me</button>
      <h1>Paws and Found</h1>
      <h2>Did you lose your pet? <br />
        Did you find a pet? <br />
      </h2>
      {/* form for adoption/reports */}
      <form className="petInfo">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />

        <label htmlFor="breed">Breed</label>
        <input id="breed" type="text"/>

        <label htmlFor="color">Color</label>
        <input id="color" type="text" />

        <label htmlFor="image">Picture</label>
        <input id="image" type="text" />

        <button type="submit" >Upload</button>
        </form>
      </>)
      
}


      //will start making forms when we have more structure for backend
      // toggling between lists for indexing data
      export default App
