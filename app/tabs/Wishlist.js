import { View, Text, Platform, Pressable } from "react-native";
import BackArrow from "../../assets/icons/BackArrow";
import HeartIcon from "../../assets/icons/HeartIcon";
import { useNavigation } from "@react-navigation/native";
import WishlistCard from "../components/WishlistCard/WishlistCard";

const Wishlist = () => {
  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-primary-dark px-4"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <View className="px-4 flex-row justify-between items-center">
        <Pressable
          className="bg-primary-soft w-8 h-8 rounded-xl justify-center items-center"
          onPress={() => navigation.navigate("Home")}
        >
          <BackArrow color="white" />
        </Pressable>

        <Text className="text-base text-white font-semibold">Favourite</Text>

        <View className="w-8 h-8" />
      </View>

      <WishlistCard />
    </View>
  );
};

export default Wishlist;
