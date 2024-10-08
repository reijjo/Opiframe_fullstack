import { Text, View, Pressable, StyleSheet } from "react-native";

export const PlayAgain = ({ setState }) => {
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
    <View style={styles.playAgainContainer}>
      <Pressable style={styles.playAgain} onPress={handlePlayAgain}>
        <Text style={[styles.buttonText, styles.playAgainText]}>
          Play again
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#c4e9ec",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  playAgainText: {
    fontWeight: "bold",
    fontSize: 24,
    textTransform: "uppercase",
  },
});
