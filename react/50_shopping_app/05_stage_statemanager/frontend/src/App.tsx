import useAction from "./hooks/useAction";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import useAppState from "./hooks/useAppState";
import { useEffect } from "react";

function App() {
  const { getList } = useAction();
  const { token, loading, error, isLogged } = useAppState();

  useEffect(() => {
    if (isLogged) {
      getList(token);
    }
  }, [isLogged]);

  let messageArea = <h4 style={{ height: 50, textAlign: "center" }}></h4>;
  if (loading) {
    messageArea = (
      <h4 style={{ height: 50, textAlign: "center" }}>Loading ...</h4>
    );
  }
  if (error) {
    messageArea = <h4 style={{ height: 50, textAlign: "center" }}>{error}</h4>;
  }
  if (isLogged) {
    return (
      <>
        <Navbar />
        {messageArea}
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/form" element={<ShoppingForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        {messageArea}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }
}

export default App;
