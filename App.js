import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./app/tabs/index";
import { StatusBar } from "react-native";
import MovieDetails from "./app/stackScreens/MovieDetails";
import Welcome from "./app/stackScreens/Auth/Welcome";
import Login from "./app/stackScreens/Auth/Login";
import Register from "./app/stackScreens/Auth/Register";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import EditProfile from "./app/stackScreens/Profile/EditProfile";

const Stack = createStackNavigator();

export default function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const loadSavedAuthData = useAuthStore((state) => state.loadStoredAuth);

  useEffect(() => {
    const initAuth = async () => await loadSavedAuthData();
    initAuth();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          ) : (
            <>
              <Stack.Screen name="MainTabs" component={Tabs} />
              <Stack.Screen name="MovieDetails" component={MovieDetails} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
