

const SignupForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        const userData = {
          name: name,
          password: password,
        };
    
        try {
          const response = await fetch("http://localhost:5501/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Tell the server that we're sending JSON data
            },
            body: JSON.stringify(userData), // Send the data as a JSON string
          });
    
          if (response.ok) {
            alert("Sign up was sucessfull!");
            // Reset form fields after a successful submission
            
          } else {
            alert("Error signing up. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Something went wrong. Please try again.");
        }
      };
    
      return (
        <form className="Username" onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <input
            id="Username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state as the user types
          />
    
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state as the user types
          />
    
        
    
          <input type="submit" value="Submit" />
        </form>
      );
  
  }
  
  export default SignupForm;