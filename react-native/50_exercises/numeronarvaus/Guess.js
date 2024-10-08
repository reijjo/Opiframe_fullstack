import { useState } from "react";
import { Text, View, Pressable, StyleSheet, TextInput } from "react-native";

export const Guess = ({ state, setState }) => {
  const [guess, setGuess] = useState("");

  const handleGuess = () => {
    const parsedGuess = parseInt(guess, 10);

    if (isNaN(parsedGuess)) {
      setState({ ...state, responseText: "That's not a number." });
    } else if (parsedGuess < state.correctNumber) {
      setState({
        ...state,
        guesses: state.guesses + 1,
        numberMin: parsedGuess + 1,
        responseText: "Number is too small.",
      });
      setGuess("");
    } else if (parsedGuess > state.correctNumber) {
      setState({
        ...state,
        guesses: state.guesses + 1,
        numberMax: parsedGuess - 1,
        responseText: "Number is too big.",
      });
      setGuess("");
    } else {
      setState({
        ...state,
        guesses: state.guesses + 1,
        responseText: `Woop woop! You guessed the number in ${
          state.guesses + 1
        } guesses.`,
        woopwoop: true,
      });
      setGuess("");
    }
  };

  return (
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
          editable={!state.woopwoop}
          keyboardType="number-pad"
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
  );
};

const styles = StyleSheet.create({
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
});
