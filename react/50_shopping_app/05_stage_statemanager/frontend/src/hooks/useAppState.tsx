import { useContext } from "react";
import AppStateContext from "../context/appStateContext";

const useAppState = () => {
  return useContext(AppStateContext);
};

export default useAppState;
