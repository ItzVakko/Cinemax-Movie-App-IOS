import { View, TextInput, Pressable } from "react-native";
import React, { useRef } from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";

const SearchBar = ({ value, setValue }) => {
  const inputRef = useRef(null);
  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View className="bg-primary-soft flex-row items-center gap-[8px] px-4 py-3 rounded-[24px]">
        <SearchIcon color="#92929D" />
        <TextInput
          ref={inputRef}
          placeholder="Search a title.."
          placeholderTextColor="#92929D"
          className="text-white text-[15px] flex-1"
          value={value}
          onChangeText={(text) => setValue(text)}
        />

        {value?.length > 0 ? (
          <>
            <Pressable onPress={() => setValue("")} hitSlop={20}>
              <CloseIcon color="white" />
            </Pressable>
          </>
        ) : null}
      </View>
    </Pressable>
  );
};

export default SearchBar;
