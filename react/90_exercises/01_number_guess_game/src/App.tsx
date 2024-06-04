import { Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <Routes>
      <Route path="/" element={<StartPage name={name} setName={setName} />} />
      <Route path="/game" element={<GamePage name={name} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
