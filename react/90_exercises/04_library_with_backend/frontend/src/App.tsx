import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AddBook, Home, Navbar } from "./components";
import useAction from "./hooks/useAction";

function App() {
  const { state, edit, getList, getLoaned, getAvailable, add } = useAction();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              list={state.list}
              edit={edit}
              getList={getList}
              getLoaned={getLoaned}
              getAvailable={getAvailable}
            />
          }
        />
        <Route path="/add" element={<AddBook add={add} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
