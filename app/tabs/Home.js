import { Image, ScrollView, Platform, View, Text } from "react-native";
import React from "react";
import Avatar from "../../assets/images/avatar.png";
import HeartIcon from "../../assets/icons/HeartIcon.js";
import SearchBar from "../components/SearchBar/SearchBar.js";

const Home = () => {
  return (
    <ScrollView
      className="flex-1 bg-primary-dark"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <View className="flex-row justify-between items-center px-8">
        <Image source={Avatar} className="w-[40px] h-[40px]" />

        <View className="mr-14">
          <Text className="text-[16px] text-white">Hello, Smith</Text>
          <Text className="text-[12px] text-text-grey">
            Let’s stream your favorite movie
          </Text>
        </View>

        <View className="bg-primary-soft w-[32px] h-[32px] rounded-[12px] justify-center items-center">
          <HeartIcon color="#FF7256" />
        </View>
      </View>

      <View className="px-8 mt-8">
        <SearchBar />
      </View>
    </ScrollView>
  );
};

export default Home;
