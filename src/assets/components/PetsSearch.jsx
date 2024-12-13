import React, {useState} from 'react'

function PetSearch({ onSearch }) {
    const [input, setInput] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(input);
    };
    return (
        <form className="adoption" onSubmit={handleSubmit}> 
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={input} 
             onChange={(event) => setInput(event.target.value)}
             placeholder="Find a Pet"/>
      <button type="submit">Search</button>

      {/* <label htmlFor="breed">Breed</label>
      <input id="breed" type="text" value={input}
      onChange={(event) => setInput(event.target.value)}/>

      <label htmlFor="color">Color</label>
      <input id="color" type="text" value={input}
      onChange={(event) => setInput(event.target.value)}/>

      <label htmlFor="image">Picture</label>
      <input id="image" type="text" value={input}
      onChange={(event) => setInput(event.target.value)}/>

      <input type="submit" value="Relinquish"/> */}
    </form>
    )
}

export default PetSearch;