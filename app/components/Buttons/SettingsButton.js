import { View, Text, TouchableOpacity } from "react-native";
import RightArrow from "../../../assets/icons/RightArrow";

const SettingsButton = ({ title, icon }) => {
  return (
    <TouchableOpacity className="pr-2 flex-row justify-between items-center">
      <View className="gap-4 flex-row items-center">
        <View className="min-w-[40px] min-h-[40px] bg-primary-soft items-center justify-center rounded-full">
          {icon}
        </View>

        <Text className="text-cm text-white font-medium">{title}</Text>
      </View>

      <RightArrow color="#12CDD9" />
    </TouchableOpacity>
  );
};

export default SettingsButton;
