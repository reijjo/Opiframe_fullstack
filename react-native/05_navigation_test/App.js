import { GreetingForm } from "./GreetingForm";
import { GreetingPage } from "./GreetingPage";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    textColor: "",
    backgroundColor: "",
  });

  const setGreeting = (data) => {
    setState({
      firstName: data.firstName,
      lastName: data.lastName,
      textColor: data.textColor.toLowerCase(),
      backgroundColor: data.backgroundColor.toLowerCase(),
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GreetingForm">
          {(props) => <GreetingForm {...props} setGreeting={setGreeting} />}
        </Stack.Screen>
        <Stack.Screen name="GreetingPage">
          {(props) => <GreetingPage {...props} {...state} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
