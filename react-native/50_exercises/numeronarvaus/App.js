import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { useState } from "react";
import { PlayAgain } from "./PlayAgain";
import { Guess } from "./Guess";

export default function App() {
  const [state, setState] = useState({
    correctNumber: Math.floor(Math.random() * 100) + 1,
    numberMax: 100,
    numberMin: 1,
    guesses: 0,
    responseText: "",
    woopwoop: false,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Guess state={state} setState={setState} />
      {state.woopwoop && <PlayAgain setState={setState} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2d3480",
    color: "#fff",
  },
});
