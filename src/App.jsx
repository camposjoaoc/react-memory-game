import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/css/App.css";
import GamePage from "./pages/gamePage";
import LoginComponent from "./components/LoginComponent";
import SignUpComponent from "./components/SignUpComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Página principal é o login */}
          <Route path="/" element={<LoginComponent />} />

          {/* Página de cadastro */}
          <Route path="/signup" element={<SignUpComponent />} />

          {/* Página de jogos após login ou cadastro */}
          <Route path="/games" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
