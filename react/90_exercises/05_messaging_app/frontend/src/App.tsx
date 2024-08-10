import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar, LoginPage } from "./components";
import { useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";

function App() {
  const rootState = useAppSelector((state: RootState) => state);
  console.log("ROOT STATE", rootState);

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
