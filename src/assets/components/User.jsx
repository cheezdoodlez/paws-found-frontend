import React, {useState} from 'react'
// import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const navigate = useNavigate(); // For programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Instead of creating a new user, we're now checking existing credentials
      const response = await fetch("http://localhost:5501/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username, 
          password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store authentication token in local storage
        localStorage.setItem('authToken', data.token);
        
        // Set user role or permissions
        localStorage.setItem('userRole', data.role);
        
        // Navigate to a dashboard or admin page
        navigate('/dashboard');
      } else {
        // Handle login failure
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"  // Changed from type="text" for security
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;