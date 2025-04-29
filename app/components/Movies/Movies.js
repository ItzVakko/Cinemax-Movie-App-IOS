import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import useFetch from "../../../hooks/useFetch";
import { fetchMovies } from "../../../services/api";

const MovieCard = ({ title, poster_path }) => {
  return (
    <TouchableOpacity className="max-w-[135px] flex-1 rounded-[8px] overflow-hidden bg-primary-soft">
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
      <Text className="text-text-grey text-[10px] mx-2 mt-1 mb-2">Action</Text>
    </TouchableOpacity>
  );
};

const Movies = ({ selectedGenre, query }) => {
  const { data, loading, error, reset } = useFetch(
    () => fetchMovies(query, selectedGenre),
    true,
    selectedGenre,
    query
  );

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
          return <MovieCard {...item} />;
        }}
        numColumns={3}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={<View className="h-4" />}
        ListHeaderComponent={
          loading ? <ActivityIndicator className="mt-4" /> : null
        }
        List
      />
    </View>
  );
};

export default Movies;
