import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { ThemeContext, themes } from "./context/ThemeContext";
import { Headline } from "./components/Headline";
import { Paragraph } from "./components/Paragraph";
import { ThemeButton } from "./components/ThemeButton";

export default function App() {
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

  console.log("state", state);

  return (
    <ThemeContext.Provider value={state.theme}>
      <View style={styles.container}>
        <Headline>Handling Text Input</Headline>
        <Paragraph>
          TextInput is a Core Component that allows the user to enter text. It
          has an onChangeText prop that takes a function to be called every time
          the text changed, and an onSubmitEditing prop that takes a function to
          be called when the text is submitted.
        </Paragraph>
        <ThemeButton toggleTheme={toggleTheme}></ThemeButton>
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
