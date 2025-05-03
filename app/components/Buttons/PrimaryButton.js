import { Text, TouchableOpacity } from "react-native";

const PrimaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="w-full bg-primary-blueAccent py-[18px] rounded-[32px] items-center"
      onPress={onPress}
    >
      <Text className="text-white text-base font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
