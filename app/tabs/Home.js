import { Image, ScrollView, Platform, View, Text } from "react-native";
import React, { useState } from "react";
import Avatar from "../../assets/images/avatar.png";
import HeartIcon from "../../assets/icons/HeartIcon.js";
import SearchBar from "../components/SearchBar/SearchBar.js";
import Categories from "../components/Categories/Categories.js";
import Movies from "../components/Movies/Movies.js";
import useAuthStore from "../../store/authStore.js";

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [query, setQuery] = useState(null);

  const handleSelectGenre = (genreId) => {
    setSelectedGenre(genreId);
  };

  const user = useAuthStore((state) => state.user);

  console.log(user);

  return (
    <ScrollView
      className="flex-1 bg-primary-dark"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <View className="flex-row justify-between items-center px-4">
        <Image source={Avatar} className="w-10 h-10" />

        <View className="mr-14">
          <Text className="text-4 text-white font-semibold">
            Hello, {user.fullName}
          </Text>
          <Text className="text-3 text-text-grey">
            Let’s stream your favorite movie
          </Text>
        </View>

        <View className="bg-primary-soft w-8 h-8 rounded-xl justify-center items-center">
          <HeartIcon color="#FF7256" />
        </View>
      </View>

      <View className="px-4 mt-8">
        <SearchBar value={query} setValue={setQuery} />
      </View>

      <Text className="text-4 text-white font-semibold mt-6 mb-3.5 px-4">
        Categories
      </Text>
      <Categories onSelectedGenre={handleSelectGenre} query={query} />

      <Movies selectedGenre={selectedGenre} query={query} />
    </ScrollView>
  );
};

export default Home;
