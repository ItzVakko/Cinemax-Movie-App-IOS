import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Search from "./Search";
import Home from "./Home";
import HouseIcon from "../../assets/icons/HouseIcon";
import HeartIcon from "../../assets/icons/HeartIcon";
import PersonIcon from "../../assets/icons/PersonIcon";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: "#1F1D2B",
          borderTopWidth: 0,
          paddingHorizontal: 30,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                icon={<HouseIcon color={focused ? "#12CDD9" : "#92929D"} />}
                label="Home"
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                icon={<HeartIcon color={focused ? "#12CDD9" : "#92929D"} />}
                label="Favourite"
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                icon={<PersonIcon color={focused ? "#12CDD9" : "#92929D"} />}
                label="Search"
              />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const TabIcon = ({ focused, icon, label }) => {
  return (
    <View
      className={`${focused ? "bg-primary-soft" : "bg-primary-dark"} ${
        focused ? "min-w-[110px]" : "min-w-[50px]"
      } flex-row justify-center items-center min-h-[40px] gap-2 mt-8 rounded-[30px]`}
    >
      {icon}

      {focused && (
        <Text
          className={`${
            focused ? "text-primary-blueAccent" : "text-text-grey"
          } text-sm font-medium`}
        >
          {label}
        </Text>
      )}
    </View>
  );
};
