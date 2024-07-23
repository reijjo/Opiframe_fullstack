import { Routes, Route, Navigate } from "react-router-dom";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import useAction from "./hooks/useAction";
import Navbar from "./components/Navbar";

function App() {
  const { state, add, remove, edit } = useAction();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ShoppingList list={state.list} remove={remove} edit={edit} />
          }
        />
        <Route path="/form" element={<ShoppingForm add={add} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
