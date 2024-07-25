import React from "react";
import { AppState } from "../types/states";

const AppStateContext = React.createContext<AppState>({
  list: [],
  isLogged: false,
  token: "",
  loading: false,
  error: "",
  user: "",
});

AppStateContext.displayName = "AppStateContext";

export default AppStateContext;
