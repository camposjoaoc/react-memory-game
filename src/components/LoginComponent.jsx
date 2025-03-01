import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginComponent.css"; // Importing CSS for styling

function LoginComponent() {
    const [username, setUsername] = useState(""); // State for username input
    const [password, setPassword] = useState(""); // State for password input
    const [message, setMessage] = useState(""); // State for displaying error messages
    const navigate = useNavigate(); // React Router's hook for navigation

    const handleLogin = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Retrieve users from localStorage or initialize with an empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find user matching username and password
        const user = users.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            // Save session state in localStorage without expiration
            localStorage.setItem("sessionActive", "true");

            setMessage(""); // Clear any previous error messages
            navigate("/games"); // Redirect to the "games" page
        } else {
            setMessage("Attention: Invalid username or password!"); // Display error message
            setPassword(""); // Clear the password field
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-container-form">
                <h1 className="title-login">Login</h1>
                <p className="login-text">Enter your account details</p>
                {/* Input for username */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-field"
                />
                {/* Input for password */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />

                {/* Submit button */}
                <button type="submit" className="btn-login">
                    Login
                </button>
                {/* Display error message */}
                <p className="message">{message}</p>
                {/* Link to Sign Up page */}

                <div className="container-inside">
                    <p className="signup-text">
                        Don&apos;t have an account?{" "}
                    </p>
                    <button onClick={() => navigate("/signup")} className="btn-signup-link">Sign Up</button>
                </div>
            </form>

        </div>
    );
}

export default LoginComponent;
