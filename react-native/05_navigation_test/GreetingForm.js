import { useState } from "react";
import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";

export const GreetingForm = (props) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    textColor: "",
    backgroundColor: "",
  });

  const setGreeting = () => {
    let data = {
      ...state,
    };
    props.setGreeting(data);
    props.navigation.navigate("GreetingPage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>First name:</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => setState({ ...state, firstName: text })}
        />
      </View>
      <View style={styles.row}>
        <Text>Last name:</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => setState({ ...state, lastName: text })}
        />
      </View>
      <View style={styles.row}>
        <Text>Text color:</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => setState({ ...state, textColor: text })}
        />
      </View>
      <View style={styles.row}>
        <Text>Background Color:</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => setState({ ...state, backgroundColor: text })}
        />
      </View>
      <View style={[styles.row, styles.buttonRow]}>
        <Pressable style={styles.button} onPress={setGreeting}>
          <Text style={styles.buttonText}>Set greeting</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  buttonRow: {
    justifyContent: "center",
  },
  button: {
    height: 80,
    width: 110,
    backgroundColor: "forestgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
  TextInput: {
    backgroundColor: "lightblue",
    width: 200,
  },
});
