import { Text, TouchableOpacity } from "react-native";

const PillButton = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity
      className={`py-2 px-3 rounded-lg min-w-[80px] items-center ${
        active && "bg-primary-soft"
      }`}
      onPress={onPress}
    >
      <Text
        className={`text-text-whiteGrey text-sm font-medium ${
          active && "text-primary-blueAccent"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PillButton;
