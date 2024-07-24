/* eslint-disable react-refresh/only-export-components */

import React from "react";

export interface ThemeType {
  color: string;
  backgroundColor: string;
}

export const themes = {
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#595959",
  },
  light: {
    color: "#000000",
    backgroundColor: "#D4D4D4",
  },
};

const ThemeContext = React.createContext<ThemeType>(themes.dark);

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
