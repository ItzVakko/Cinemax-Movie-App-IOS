import { View, Text, TextInput } from "react-native";
import React from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import FilterIcon from "../../../assets/icons/FilterIcon";

const SearchBar = () => {
  return (
    <View className="bg-primary-soft flex-row items-center gap-[8px] px-[16px] py-[12px] rounded-[24px]">
      <SearchIcon color="#92929D" />
      <TextInput
        placeholder="Search a title.."
        placeholderTextColor="#92929D"
        className="text-white text-[15px] flex-1"
      />

      <View className="w-[1px] h-[20px] bg-text-darkGrey"></View>

      <FilterIcon color="white" />
    </View>
  );
};

export default SearchBar;
