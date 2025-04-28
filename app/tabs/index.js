import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "./Search";
import Home from "./Home";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
