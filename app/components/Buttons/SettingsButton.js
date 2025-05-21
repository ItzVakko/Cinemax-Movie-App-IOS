import { View, Text, TouchableOpacity } from "react-native";
import RightArrow from "../../../assets/icons/RightArrow";
import { useNavigation } from "@react-navigation/native";

const SettingsButton = ({ title, icon, navigate }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="pr-2 flex-row justify-between items-center"
      onPress={() => navigation.navigate(navigate)}
    >
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
