import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import StarIcon from "../../../assets/icons/StarIcon";
import HeartIcon from "../../../assets/icons/HeartIcon";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../store/authStore";
import useFetch from "../../../hooks/useFetch";
import { fetchRemoveWishlist } from "../../../services/wishlistApi";

const WishlistCard = ({ id, poster_path, genres, title, vote_average }) => {
  const navigation = useNavigation();

  const token = useAuthStore((state) => state.token);
  const dataUpdate = useAuthStore((state) => state.dataUpdate);

  const { fetchData: removeFromWishlist } = useFetch({
    fetchFunction: (movieId) => fetchRemoveWishlist(movieId, token),
  });

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishlist(id);
      dataUpdate();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  return (
    <TouchableOpacity
      className="w-full px-4 py-3 bg-primary-soft rounded-[16px] flex-row gap-4"
      onPress={() => navigation.navigate("MovieDetails", { id: id })}
    >
      <Image
        className="w-[120px] h-[80px] rounded-[8px]"
        source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
      />

      <View className="justify-between flex-1">
        <Text className="text-text-whiteGrey font-medium">
          {genres[0].name}
        </Text>

        <Text className="text-white text-base font-semibold">{title}</Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-4">
            <Text className="text-text-grey font-medium">Movie</Text>

            <View className="flex-row items-center gap-1">
              <StarIcon color="#FF8700" />
              <Text className="text-secondary-orange text-sm font-semibold">
                {vote_average % 2 === 0
                  ? vote_average / 2
                  : (vote_average / 2).toFixed(1)}
              </Text>
            </View>
          </View>

          <Pressable onPress={handleRemoveFromWishlist}>
            <HeartIcon color="#FB4141" />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WishlistCard;
