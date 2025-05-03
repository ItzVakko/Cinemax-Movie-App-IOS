import { View, Text, TextInput, Pressable } from "react-native";
import HidePasswordIcon from "../../../assets/icons/HidePasswordIcon";
import { useState } from "react";

const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  setValue,
  onFocus,
}) => {
  const [isPassHidden, setIsPassHidden] = useState(true);
  return (
    <>
      {type === "text" && (
        <View className="px-4">
          {name && (
            <Text className="text-text-whiteGrey px-3 bg-primary-dark absolute z-10 bottom-[45px] left-6">
              {name}
            </Text>
          )}
          <TextInput
            className="w-full h-[53px] rounded-[24px] border border-primary-soft px-6 text-white"
            placeholder={placeholder}
            placeholderTextColor="#92929D"
            value={value}
            onChangeText={(text) => setValue(text)}
            onFocus={onFocus}
          />
        </View>
      )}

      {type === "password" && (
        <View className="px-4">
          {name && (
            <Text className="text-text-whiteGrey px-3 bg-primary-dark absolute z-10 bottom-[45px] left-6">
              {name}
            </Text>
          )}

          <View className="w-full h-[53px] flex-row items-center gap-4 rounded-[24px] border border-primary-soft px-6">
            <TextInput
              className="flex-1 h-full text-white"
              placeholder={placeholder}
              placeholderTextColor="#92929D"
              value={value}
              onChangeText={(text) => setValue(text)}
              secureTextEntry={isPassHidden}
              onFocus={onFocus}
            />
            <Pressable onPress={() => setIsPassHidden((prev) => !prev)}>
              <HidePasswordIcon hidden={isPassHidden} color="#92929D" />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default Input;
