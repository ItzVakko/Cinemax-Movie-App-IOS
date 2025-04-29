import { Pressable, Text, View } from "react-native";
import React from "react";

const Movies = () => {
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
    </View>
  );
};

export default Movies;
