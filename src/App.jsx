import { useState, useEffect } from 'react'
import axios from 'axios'
import { findPets, test } from './assets/services/Pets'
import './App.css'
import PetSearch from './assets/components/PetsSearch'
import PetForm from './assets/components/Form'


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
    <div>
      <h1>Adoption Form</h1>
    <PetForm/>
    </div>

      </>)
      
}


      //will start making forms when we have more structure for backend
      // toggling between lists for indexing data
      export default App
