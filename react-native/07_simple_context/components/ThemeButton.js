import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Text, Pressable, StyleSheet } from "react-native";

export const ThemeButton = (props) => {
  const theme = useContext(ThemeContext);

  const styles = StyleSheet.create({
    button: {
      width: 160,
      height: 80,
      backgroundColor: theme.backgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: "Arial",
      fontSize: 16,
      margin: 10,
      color: theme.color,
    },
  });

  return (
    <Pressable style={styles.button} onPress={props.toggleTheme}>
      <Text style={styles.text}>Toggle Theme.</Text>
    </Pressable>
  );
};
