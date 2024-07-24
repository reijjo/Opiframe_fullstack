import { useState } from "react";
import ThemeContext, { themes } from "./context/themeContext";
import Headline from "./components/Headline";
import Paragraph from "./components/Paragraph";
import ThemeButton from "./components/ThemeButton";

function App() {
  const [state, setState] = useState({
    theme: themes.dark,
  });

  const toggleTheme = () => {
    if (state.theme === themes.dark) {
      setState({ theme: themes.light });
    } else {
      setState({ theme: themes.dark });
    }
  };

  return (
    <>
      <ThemeContext.Provider value={state.theme}>
        <Headline>The HTML Option element</Headline>
        <Paragraph>
          The HTML element is used to define an item contained in a , an , or a
          element. As such, can represent menu items in popups and other lists
          of items in an HTML document
        </Paragraph>
        <ThemeButton toggleTheme={toggleTheme} />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
