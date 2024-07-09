import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components";
import useAction from "./hooks/useAction";

function App() {
  const { state, edit } = useAction();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home list={state.list} edit={edit} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
