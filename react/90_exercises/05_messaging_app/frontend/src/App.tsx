import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar, LoginPage } from "./components";
import { useAppSelector } from "./store/hooks";
import { AllStates } from "./utils/types";

function App() {
  const userState = useAppSelector((state: AllStates) => state.user);

  console.log("userState", userState);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
