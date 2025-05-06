import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import StarIcon from "../../../assets/icons/StarIcon";
import HeartIcon from "../../../assets/icons/HeartIcon";

const WishlistCard = ({ poster_path, genre, title, vote_average }) => {
  return (
    <TouchableOpacity className="w-full px-4 py-3 bg-primary-soft rounded-[16px] flex-row gap-4 justify-between">
      <Image
        className="w-[120px] h-[80px]"
        source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
      />

      <View className="justify-between">
        <Text className="text-text-whiteGrey font-medium">{genre}</Text>

        <Text className="text-white text-base font-semibold">{title}</Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-2">
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

          <Pressable>
            <HeartIcon color="#FB4141" />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WishlistCard;
