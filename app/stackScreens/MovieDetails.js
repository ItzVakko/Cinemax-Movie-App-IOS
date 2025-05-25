import {
  ImageBackground,
  Platform,
  Pressable,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { fetchMovieDetails } from "../../services/movieApi";
import BackArrow from "../../assets/icons/BackArrow";
import HeartIcon from "../../assets/icons/HeartIcon";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import ClockIcon from "../../assets/icons/ClockIcon";
import FilmTypeIcon from "../../assets/icons/FilmTypeIcon";
import StarIcon from "../../assets/icons/StarIcon";
import RoundButton from "../components/Buttons/RoundButton";
import PlayIcon from "../../assets/icons/PlayIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import { ScrollView } from "react-native-gesture-handler";
import {
  fetchAddWishlist,
  fetchRemoveWishlist,
} from "../../services/wishlistApi";
import useAuthStore from "../../store/authStore";

const MovieDetails = ({ route }) => {
  const [isWishlistActive, setIsWishlistActive] = useState(false);

  const { id } = route.params;
  const navigation = useNavigation();

  const token = useAuthStore((state) => state.token);
  const dataUpdate = useAuthStore((state) => state.dataUpdate);

  const { data: movie, fetchData } = useFetch({
    fetchFunction: () => fetchMovieDetails(String(id)),
  });

  const { fetchData: addToWishlist } = useFetch({
    fetchFunction: (movieId) => fetchAddWishlist(movieId, token),
  });

  const { fetchData: removeFromWishlist } = useFetch({
    fetchFunction: (movieId) => fetchRemoveWishlist(movieId, token),
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (movie) {
      const checkWishlist = () => {
        const userWishlist = useAuthStore.getState().user?.wishlist || [];
        setIsWishlistActive(userWishlist.includes(JSON.stringify(movie.id)));
      };

      checkWishlist();
    }
  }, [movie]);

  const handleAddToWishlist = async () => {
    try {
      setIsWishlistActive(true);
      await addToWishlist(id);
      dataUpdate();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      setIsWishlistActive(false);
      await removeFromWishlist(id);
      dataUpdate();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-primary-dark">
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
        className="w-full h-fit bg-custom-gradient"
        style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
      >
        <LinearGradient
          colors={[
            "rgba(31,29,43,0.6)",
            "rgba(31,29,43,0.7)",
            "rgba(31,29,43,1)",
          ]}
          locations={[0, 0.3, 1]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <View className="px-4 flex-row justify-between items-center">
          <Pressable
            className="bg-primary-soft w-8 h-8 rounded-xl justify-center items-center"
            onPress={() => navigation.goBack()}
          >
            <BackArrow color="white" />
          </Pressable>

          <Text className="text-base text-white font-semibold">
            {movie?.title}
          </Text>

          <Pressable
            className="bg-primary-soft w-8 h-8 rounded-xl justify-center items-center"
            onPress={
              isWishlistActive ? handleRemoveFromWishlist : handleAddToWishlist
            }
          >
            <HeartIcon color={isWishlistActive ? "#FF7256" : "grey"} />
          </Pressable>
        </View>

        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          className="w-[200px] h-[300px] rounded-[12px] mx-auto mt-6"
        />

        <View className="flex-row gap-4 mt-4 mx-auto">
          <View className="flex-row gap-2">
            <CalendarIcon color="#92929D" />
            <Text className="text-text-grey text-base">
              {movie?.release_date.substring(0, 4)}
            </Text>
          </View>
          <View className="bg-text-darkGrey w-px h-6" />
          <View className="flex-row gap-2">
            <ClockIcon color="#92929D" />
            <Text className="text-text-grey text-base">
              {movie?.runtime} Min
            </Text>
          </View>
          <View className="bg-text-darkGrey w-px h-6" />
          <View className="flex-row gap-2">
            <FilmTypeIcon color="#92929D" />
            <Text className="text-text-grey text-base">
              {movie?.genres[0].name}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-1 max-w-[55px] bg-[rgba(37,40,54,0.7)] px-2 py-1 rounded-lg  mt-4 mx-auto">
          <StarIcon color="#FF8700" />
          <Text className="text-secondary-orange text-sm font-semibold">
            {movie?.vote_average % 2 === 0
              ? movie?.vote_average / 2
              : (movie?.vote_average / 2).toFixed(1)}
          </Text>
        </View>

        <View className="flex-row gap-4 mx-auto mt-8">
          <TouchableOpacity className="w-[110px] h-12 bg-secondary-orange px-6 items-center rounded-full flex-row gap-2">
            <PlayIcon color="white" />
            <Text className="text-white font-medium">Play</Text>
          </TouchableOpacity>
          <RoundButton icon={<ShareIcon color="#12CDD9" />} />
        </View>
      </ImageBackground>

      <Text className="mx-6 mt-6 text-white text-base font-semibold">
        Story Line
      </Text>

      <Text className="text-text-whiteGrey text-sm mx-6 mt-2">
        {movie?.overview}
      </Text>

      <Text className="mx-6 mt-6 text-white text-base font-semibold">
        Languages
      </Text>

      <Text className="text-text-whiteGrey text-sm mx-6 mt-2">
        {movie?.spoken_languages.map((lang) => lang.english_name).join(" - ")}
      </Text>

      <View className="flex-row gap-10">
        <View>
          <Text className="mx-6 mt-6 text-white text-base font-semibold">
            Budget
          </Text>
          <Text className="text-text-whiteGrey text-sm mx-6 mt-2">
            ${movie?.budget / 1000000} Million
          </Text>
        </View>

        <View>
          <Text className="mx-6 mt-6 text-white text-base font-semibold">
            Revenue
          </Text>
          <Text className="text-text-whiteGrey text-sm mx-6 mt-2">
            ${Math.round(movie?.revenue) / 1000000}
          </Text>
        </View>
      </View>

      <Text className="mx-6 mt-6 text-white text-base font-semibold">
        Production Countries
      </Text>

      <Text className="text-text-whiteGrey text-sm mx-6 mt-2">
        {movie?.production_countries.map((country) => country.name).join(", ")}
      </Text>
    </ScrollView>
  );
};

export default MovieDetails;
