import {
  View,
  Text,
  Platform,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import BackArrow from "../../assets/icons/BackArrow";
import { useNavigation } from "@react-navigation/native";
import WishlistCard from "../components/WishlistCard/WishlistCard";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { fetchWishlistMovies } from "../../services/movieApi";
import EmptyBoxImage from "../../assets/images/empty-box.png";

const Wishlist = () => {
  const navigation = useNavigation();

  const user = useAuthStore((state) => state.user);

  const { data, loading, error, fetchData } = useFetch({
    fetchFunction: () => fetchWishlistMovies(user.wishlist),
  });

  useEffect(() => {
    fetchData(user?.wishlist);
  }, [user?.wishlist]);

  return (
    <View
      className="flex-1 bg-primary-dark px-4"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <Text className="text-base text-white text-center font-semibold">
        Favourite
      </Text>

      <FlatList
        className="mt-8"
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <WishlistCard {...item} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={
          !loading && !error ? (
            <View className="items-center gap-2 mt-[50%]">
              <Image source={EmptyBoxImage} />
              <Text className="text-text-whiteGrey text-base text-center font-semibold tracking-[0.12px] leading-[160%] max-w-[160px]">
                There is no movie yet!
              </Text>
              <Text className="text-text-grey text-xs text-center max-w-[200px]">
                Find your favourite movie, press heart and add to Wishlist
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          (loading ? <ActivityIndicator className="my-8" /> : null) ||
          (error && <Text>Error: {error}</Text>)
        }
      />
    </View>
  );
};

export default Wishlist;
