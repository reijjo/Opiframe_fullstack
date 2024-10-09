import { useState } from "react";
import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";
import { useAction } from "../hooks/useAction";

export const LoginPage = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { register, login } = useAction();

  const onRegister = () => {
    let user = {
      ...state,
    };
    register(user);
    console.log("lets register", user);
  };

  const onLogin = () => {
    let user = {
      ...state,
    };
    login(user);
    console.log("lets login", user);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Username:</Text>
        <TextInput
          style={[styles.text, styles.input]}
          onChangeText={(text) => setState({ ...state, username: text })}
          placeholder="Username"
          value={state.username}
        />
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.label]}>Password:</Text>
        <TextInput
          style={[styles.text, styles.input]}
          onChangeText={(text) => setState({ ...state, password: text })}
          placeholder="Password"
          value={state.password}
          secureTextEntry
        />
      </View>
      <View style={[styles.row, styles.buttonRow]}>
        <Pressable
          style={[styles.registerButton, styles.text]}
          onPress={onRegister}
        >
          <Text style={styles.text}>Register</Text>
        </Pressable>
        <Pressable
          style={[styles.registerButton, styles.loginButton, styles.text]}
          onPress={onLogin}
        >
          <Text style={styles.text}>Login</Text>
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
    paddingVertical: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    justifyContent: "space-evenly",
    width: "60%",
  },
  registerButton: {
    height: 50,
    width: 100,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "lightgreen",
  },
  text: {
    fontFamily: "Arial",
    fontSize: 18,
  },
  input: {
    width: 200,
    backgroundColor: "white",
    padding: 4,
  },
});
