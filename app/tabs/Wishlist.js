import { View, Text, Platform, Pressable, FlatList } from "react-native";
import BackArrow from "../../assets/icons/BackArrow";
import { useNavigation } from "@react-navigation/native";
import WishlistCard from "../components/WishlistCard/WishlistCard";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { fetchWishlistMovies } from "../../services/movieApi";

const Wishlist = () => {
  const navigation = useNavigation();

  const user = useAuthStore((state) => state.user);

  const { data, fetchData } = useFetch({
    fetchFunction: () => fetchWishlistMovies(user.wishlist),
  });

  useEffect(() => {
    fetchData(user.wishlist);
  }, [user.wishlist]);

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

      <FlatList
        className="mt-8"
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <WishlistCard {...item} />}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </View>
  );
};

export default Wishlist;
