import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "./LoginPage";
import { ShoppingList } from "./ShoppingList";
import { ShoppingForm } from "./ShoppingForm";
import { useAppState } from "../hooks/useAppState";
import { useAction } from "../hooks/useAction";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export const Container = (props) => {
  const { isLogged, error, loading } = useAppState();
  const { getList } = useAction();

  useEffect(() => {
    if (isLogged) {
      getList();
    }
  }, [isLogged]);

  let title = "Shopping App";
  if (loading) {
    title = "Loading...";
  }

  if (error) {
    title = "Error";
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOption={{
          title: title,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
      >
        {isLogged ? (
          <>
            <Stack.Screen name="ShoppingList" component={ShoppingList} />
            <Stack.Screen name="ShoppingForm" component={ShoppingForm} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
