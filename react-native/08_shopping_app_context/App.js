import { StyleSheet, View } from "react-native";
import { StateProvider } from "./context/StateProvider";
import { Container } from "./components/Container";

export default function App() {
  return (
    // <View style={styles.container}>
    <StateProvider>
      <Container />
    </StateProvider>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
  },
});
