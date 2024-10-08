import { View, Text, StyleSheet, Pressable } from "react-native";

export const GreetingPage = (props) => {
  let textColor = "black";
  let backgroundColor = "white";

  if (props.textColor) {
    textColor = props.textColor;
  }

  if (props.backgroundColor) {
    backgroundColor = props.backgroundColor;
  }

  let styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: backgroundColor,
    },
    text: {
      color: textColor,
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Inter",
    },
    button: {
      height: 80,
      width: 110,
      backgroundColor: "coral",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello, {props.firstName} {props.lastName}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => props.navigation.navigate("GreetingForm")}
      >
        <Text>Go back</Text>
      </Pressable>
    </View>
  );
};
