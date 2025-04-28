import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./app/tabs/index";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainTabs" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
