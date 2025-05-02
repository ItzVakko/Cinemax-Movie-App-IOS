import { Text, TouchableOpacity } from "react-native";

const PrimaryButton = ({ title }) => {
  return (
    <TouchableOpacity className="w-full bg-primary-blueAccent py-[18px] rounded-[32px] items-center">
      <Text className="text-white text-base font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
