import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/SignUpComponent.css";

function SignUpComponent() {
    // State variables for form inputs
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState(""); // State for error/success messages
    const navigate = useNavigate(); // React Router's hook for navigation

    const handleSignUp = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Retrieve existing users from localStorage or initialize with an empty array
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the username already exists
        if (users.some((user) => user.username === username)) {
            setMessage("Username already exists.");
            setUsername(""); // Clear username field
            return;
        }

        // Check if the email is already registered
        if (users.some((user) => user.email === email)) {
            setMessage("Email already registered.");
            setEmail(""); // Clear email field
            return;
        }

        // Check if passwords match
        if (password !== repeatPassword) {
            setMessage("Passwords do not match.");
            setPassword(""); // Clear password fields
            setRepeatPassword("");
            return;
        }

        // Enforce minimum password length
        if (password.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            setPassword(""); // Clear password fields
            setRepeatPassword("");
            return;
        }

        // Add new user to the list and save to localStorage
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        setMessage(""); // Clear any previous messages
        navigate("/games"); // Navigate to the "games" page after successful signup
    };

    return (
        <div className="signUp-container">
            <form onSubmit={handleSignUp} className="signUp-container-form">
                <h1 className="title-signup">Sign Up</h1>
                {/* Input for username */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-field"
                />
                {/* Input for email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                {/* Input for password */}
                <input
                    type="password"
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                {/* Input for repeat password */}
                <input
                    type="password"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                    className="input-field"
                />
                {/* Submit button */}
                <button type="submit" className="btn-signup">
                    Create
                </button>
                {/* Display error or success messages */}
                <p className="message">{message}</p>
                <p className="signup-text">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")} className="btn-link">
                        Sign in
                    </span>
                </p>
            </form>
        </div>
    );
}

export default SignUpComponent;
