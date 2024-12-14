import React, {useState} from 'react'

function PetSearch({ onSearch }) {
    const [input, setInput] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(input);
    };
    return (
        <form className="petReq" onSubmit={handleSubmit}> 
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={input} 
             onChange={(event) => setInput(event.target.value)}
             placeholder="Find a Pet"/>
      <button type="submit">Search</button>

    </form>
    )
}

export default PetSearch;