import { useState } from "react";
import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";

export const ShoppingForm = (props) => {
  const [state, setState] = useState({
    type: "",
    count: "",
    price: "",
  });

  const addToList = () => {
    let item = {
      ...state,
      id: 0,
    };

    props.addToList(item),
      setState({
        type: "",
        count: "",
        price: "",
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Type:</Text>
        <TextInput
          style={[styles.text, styles.input]}
          onChangeText={(text) => setState({ ...state, type: text })}
          value={state.type}
          inputMode="numeric"
        />
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Count:</Text>
        <TextInput
          style={[styles.text, styles.input]}
          onChangeText={(text) => setState({ ...state, count: text })}
          value={state.type}
          inputMode="numeric"
        />
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Price:</Text>
        <TextInput
          style={[styles.text, styles.input]}
          onChangeText={(text) => setState({ ...state, price: text })}
          value={state.type}
          inputMode="numeric"
        />
      </View>
      <View style={[styles.row, styles.buttonRow]}>
        <Pressable style={styles.addButton} onPress={addToList}>
          <Text style={[styles.text, styles.buttonText]}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonRow: {
    justifyContent: "center",
  },
  addButton: {
    height: 60,
    width: "60%",
    backgroundColor: "#4a7766",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 18,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
  },
  input: {
    width: 200,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
