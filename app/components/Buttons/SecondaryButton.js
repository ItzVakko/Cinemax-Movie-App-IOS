import { Text, TouchableOpacity } from "react-native";

const SecondaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      className="w-full border border-[#12CDD9] py-[18px] rounded-[32px] items-center"
      onPress={onPress}
    >
      <Text className="text-primary-blueAccent text-base font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
