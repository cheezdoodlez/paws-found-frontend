import React, {useState} from 'react'
// import { useNavigate } from 'react-router-dom';
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);

  // Login method
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5501/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        setIsLoggedIn(true);
        setUserRole(data.role);
        setError(null);
        return {
          success: true,
          role: data.role
        };
      } else {
        // Login failed
        setError(data.message || "Invalid credentials");
        return {
          success: false,
          error: data.message
        };
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Network error. Please try again.");
      return {
        success: false,
        error: "Network error"
      };
    }
  };

  // Logout method
  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setError(null);
  };

  return {
    isLoggedIn,
    userRole,
    error,
    login,
    logout
  };
};

// Authentication Component children is used to render any content that is passed between the opening and closing tags of the LoginForm component.
const LoginForm = ({ children }) => {
  const auth = useAuth();

  // Login Form Component
  const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      const result = await auth.login(username, password);

      if (!result.success) {
        // Error handling is managed by the useAuth hook
        return;
      }

      // Login successful (handled by useAuth state)
    };

    return (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {auth.error && (
            <div className="error-message">
              {auth.error}
            </div>
          )}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  // Render logic
  const renderContent = () => {
    // If not logged in, show login form
    if (!auth.isLoggedIn) {
      return <LoginForm />;
    }

    // If logged in, render children (passed components)
    return (
      <div>
        {/* Optional: Add a logout button */}
        <button onClick={auth.logout}>Logout</button>
        {children}
      </div>
    );
  };

  // Provide authentication context to children
  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default LoginForm;