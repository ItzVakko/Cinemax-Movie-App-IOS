import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { fetchMovies } from "../../../services/movieApi";
import SearchImage from "../../../assets/images/search.png";
import StarIcon from "../../../assets/icons/StarIcon";
import { useNavigation } from "@react-navigation/native";

const MovieCard = ({ title, poster_path, vote_average, id, navigation }) => {
  return (
    <TouchableOpacity
      className="max-w-[135px] flex-1 rounded-[8px] overflow-hidden bg-primary-soft"
      onPress={() => navigation.navigate("MovieDetails", { id: id })}
    >
      <View className="flex-row gap-1 absolute z-10 bg-[rgba(37,40,54,0.7)] px-2 py-1 rounded-lg top-2 right-2">
        <StarIcon color="#FF8700" />
        <Text className="text-secondary-orange text-sm font-semibold">
          {vote_average % 2 === 0
            ? vote_average / 2
            : (vote_average / 2).toFixed(1)}
        </Text>
      </View>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
        className="w-full h-[150px]"
      />
      <Text
        numberOfLines={1}
        className="text-white text-sm font-semibold mt-3 mx-2"
      >
        {title}
      </Text>
      <Text className="text-text-grey text-[10px] mx-2 mt-1 mb-2">Movie</Text>
    </TouchableOpacity>
  );
};

const Movies = ({ selectedGenre, query }) => {
  const { data, loading, error, fetchData } = useFetch({
    fetchFunction: () => fetchMovies(query, selectedGenre),
  });

  useEffect(() => {
    if (selectedGenre !== undefined) {
      fetchData();
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (query?.trim()) {
      const timeout = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      fetchData();
    }
  }, [query]);

  const navigation = useNavigation();

  return (
    <View className="px-4 mt-6">
      <View className="flex-row justify-between">
        <Text className="text-4 text-white font-semibold mb-3.5">
          Most popular
        </Text>
        <Pressable>
          <Text className="text-sm text-primary-blueAccent tracking-[0.12px]">
            See All
          </Text>
        </Pressable>
      </View>

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={data}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return <MovieCard {...item} navigation={navigation} />;
        }}
        numColumns={3}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={<View className="h-4" />}
        ListHeaderComponent={
          (loading ? <ActivityIndicator className="my-8" /> : null) ||
          (error && <Text>Error: {error}</Text>) ||
          (!loading && !error && query?.trim() && data?.length > 0 && (
            <Text className="text-text-grey text-base my-4">
              Search Results for{" "}
              <Text className="text-text-whiteGrey">{query?.trim()}</Text>
            </Text>
          ))
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="items-center gap-2 mt-12">
              <Image source={SearchImage} />
              <Text className="text-text-whiteGrey text-base text-center font-semibold tracking-[0.12px] leading-[160%] max-w-[150px]">
                We Are Sorry, We Can Not Find The Movie :(
              </Text>
              <Text className="text-text-grey text-xs text-center max-w-[200px]">
                Find your movie by typing title or choose categories
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Movies;
