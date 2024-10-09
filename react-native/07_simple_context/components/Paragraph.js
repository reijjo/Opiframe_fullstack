import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { View, Text, StyleSheet } from "react-native";

export const Paragraph = (props) => {
  const theme = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    text: {
      fontFamily: "Arial",
      fontSize: 14,
      color: theme.color,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};
