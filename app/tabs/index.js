import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Search from "./Search";
import Home from "./Home";
import HouseIcon from "../../assets/icons/HouseIcon";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View className="flex-row flex-1 w-full min-w-[100px] h-[40px] bg-primary-soft rounded-[16px] justify-center items-center">
                <HouseIcon color="#12CDD9" />
                <Text className="">Home</Text>
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
