import { useNavigate } from "react-router-dom";
import "../css/Logoff.css";

const Logoff = () => {
    const navigate = useNavigate();

    const handleLogoff = () => {
        // Remove session-related data from localStorage
        localStorage.removeItem("sessionActive");

        // Redirect to the login page
        navigate("/");
    };

    return (
        <button onClick={handleLogoff} className="btn-logoff-game" type="button">
            Logoff
        </button>
    );
};

export default Logoff;
