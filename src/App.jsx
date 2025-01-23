import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/css/App.css";
import GamePage from "./pages/gamePage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />

          <Route path="/signup" element={<SignUpComponent />} />

          <Route path="/games" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
