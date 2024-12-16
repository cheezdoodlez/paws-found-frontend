import { useState, useEffect } from 'react'
import axios from 'axios'
import { findPets, test } from './assets/services/Pets'
import './App.css'
import PetForm from './assets/components/Form'
import PetDisplayPage from './assets/components/PetDisplay'
import LoginForm from './assets/components/User'


const App = () => {
  // const onSearch = (query) => findPets(query)

  return (
    <>
        <button onClick={test}>Test me</button>
      <h1>Paws and Found</h1>
      <h2>Did you lose your pet? <br />
        Did you find a pet? <br />
      </h2>
    <div>
      <h1>Adoption Form</h1>
    <LoginForm/>
    <PetForm/>
    <PetDisplayPage/>
    </div>

      </>)
      
}


    
       // Picture property not displaying in app//
       //update search functionality
      export default App
