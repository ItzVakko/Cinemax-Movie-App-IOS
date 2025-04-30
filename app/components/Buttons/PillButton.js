import { Text, TouchableOpacity } from "react-native";

const PillButton = ({ title, active, onPress, query }) => {
  return (
    <TouchableOpacity
      className={`py-2 px-3 rounded-lg min-w-[80px] items-center ${
        active && "bg-primary-soft"
      } ${query && "bg-gray-800 opacity-25"}`}
      onPress={onPress}
      disabled={query ? true : false}
    >
      <Text
        className={`text-text-whiteGrey text-sm font-medium ${
          active && "!text-primary-blueAccent"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PillButton;
