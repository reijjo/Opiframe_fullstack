import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { useAction } from "../hooks/useAction";
import { useAppState } from "../hooks/useAppState";

export const ShoppingList = (props) => {
  const { list } = useAppState();
  const { remove, changeMode, logout } = useAction();

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
        <Pressable
          style={[styles.navigateButton, styles.logoutButton]}
          onPress={logout}
        >
          <Text style={styles.textStyle}>Logout</Text>
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
                onPress={() => remove(item._id)}
              >
                <Text style={styles.textStyle}>Remove</Text>
              </Pressable>
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  changeMode("Edit");
                  props.navigation.navigate("Add Item");
                }}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item._id}
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
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
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
  logoutButton: {
    backgroundColor: "red",
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
