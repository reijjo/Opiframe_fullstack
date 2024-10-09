import { createContext } from "react";

export const themes = {
  dark: {
    backgroundColor: "#333",
    color: "#fff",
  },
  light: {
    backgroundColor: "#fff",
    color: "#333",
  },
};

export const ThemeContext = createContext(themes.dark);
