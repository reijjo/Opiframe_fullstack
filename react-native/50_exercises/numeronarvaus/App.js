import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [state, setState] = useState({
    correctNumber: Math.floor(Math.random() * 100) + 1,
    numberMax: 100,
    numberMin: 1,
    guesses: 0,
    responseText: "",
    woopwoop: false,
  });
  const [guess, setGuess] = useState("");

  const handleGuess = () => {
    const parsedGuess = parseInt(guess, 10);

    setState({ ...state, guesses: state.guesses + 1 });

    if (isNaN(parsedGuess)) {
      setState({ ...state, responseText: "That's not a number." });
    } else if (parsedGuess < state.correctNumber) {
      setGuess("");
      setState({
        ...state,
        numberMin: parsedGuess + 1,
        responseText: "Number is too small.",
      });
    } else if (parsedGuess > state.correctNumber) {
      setGuess("");
      setState({
        ...state,
        numberMax: parsedGuess - 1,
        responseText: "Number is too big.",
      });
    } else {
      setGuess("");
      setState({
        ...state,
        responseText: `Woop woop! You guessed the number in ${state.guesses} guesses.`,
        woopwoop: true,
      });
    }
  };

  console.log("state", state);

  const handlePlayAgain = () => {
    setState({
      correctNumber: Math.floor(Math.random() * 100) + 1,
      numberMax: 100,
      numberMin: 1,
      guesses: 0,
      responseText: "",
      woopwoop: false,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.text}>
          Guess a number between{" "}
          <Text style={{ fontWeight: "bold" }}>{state.numberMin}</Text> and{" "}
          <Text style={{ fontWeight: "bold" }}>{state.numberMax}</Text>
        </Text>
        <View style={styles.guess}>
          <TextInput
            style={styles.input}
            onChangeText={(g) => {
              setGuess(g);
              setState({ ...state, responseText: "" });
            }}
            value={guess}
            disabled={state.woopwoop}
          />
          <Pressable
            style={styles.button}
            onPress={handleGuess}
            disabled={state.woopwoop}
          >
            <Text style={styles.buttonText}>Guess!</Text>
          </Pressable>
        </View>
        <Text style={[styles.text, styles.responseText]}>
          {state.responseText}
        </Text>
      </View>
      {state.woopwoop && (
        <View style={styles.playAgainContainer}>
          <Pressable
            style={[styles.button, styles.playAgain]}
            onPress={handlePlayAgain}
          >
            <Text style={[styles.buttonText, styles.playAgainText]}>
              Play again
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2d3480",
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#2d3480",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    color: "#fff",
    fontFamily: "Inter",
  },
  button: {
    backgroundColor: "#c4e9ec",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  guess: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 100,
  },
  responseText: {
    marginTop: 16,
    color: "white",
    fontWeight: "bold",
  },
  playAgainContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
    alignItems: "center",
  },
  playAgain: {
    width: "80%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  playAgainText: {
    fontWeight: "bold",
    fontSize: 24,
    textTransform: "uppercase",
  },
});
