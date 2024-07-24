/* eslint-disable @typescript-eslint/no-explicit-any */
import ShoppingList from "./components/ShoppingList";
import ShoppingForm from "./components/ShoppingForm";
import { Routes, Route, Navigate } from "react-router-dom";
import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getList } from "./store/shoppingSlice";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const dispatch: ThunkDispatch<any, any, PayloadAction> = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShoppingList />} />
        <Route path="/form" element={<ShoppingForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
