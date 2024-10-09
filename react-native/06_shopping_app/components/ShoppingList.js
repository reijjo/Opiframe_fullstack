import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";

export const ShoppingList = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <Pressable
          style={styles.navigateButton}
          onPress={() => props.navigation.navigate("ShoppingForm")}
        >
          <Text style={[styles.textStyle, styles.buttonText]}>
            Add new item
          </Text>
        </Pressable>
      </View>
      <View style={styles.listBox}>
        <FlatList
          data={props.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.textStyle}>{item.type}</Text>
              <Text style={styles.textStyle}>{item.count}</Text>
              <Text style={styles.textStyle}>{item.price}</Text>
              <Pressable
                style={styles.buttonStyle}
                onPress={() => props.removeFromList(item.id)}
              >
                <Text style={styles.textStyle}>Remove</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listBox: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  navigateButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a7766",
    width: "60%",
    height: 60,
    borderRadius: "50%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  textStyle: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 14,
    padding: 2,
  },
  buttonStyle: {
    padding: 4,
    width: "100",
    height: 50,
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
