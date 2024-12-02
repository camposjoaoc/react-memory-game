import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GamePage from "./pages/gamePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
