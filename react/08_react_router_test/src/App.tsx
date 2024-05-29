import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Secret from "./components/Secret";

function App() {
  return (
    <>
      <ul style={{ listStyleType: "none" }}>
        <li>
          <Link to="/">Home page</Link>
        </li>
        <li>
          <Link to="/about">About page</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
