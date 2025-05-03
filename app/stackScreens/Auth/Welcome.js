import { View, Text, Image, Pressable } from "react-native";
import Logo from "../../../assets/images/logo.png";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View className="bg-[#171725] flex-1 justify-center items-center">
      <Image source={Logo} className="w-[88px] h-[88px]" />
      <Text className="text-[28px] text-white font-semibold mt-6 tracking-[2px]">
        CINEMAX
      </Text>
      <Text className="text-text-grey font-semibold mt-2 text-center max-w-[250px]">
        Welcome to the Cinemax Mobile App, where you can see any movie
      </Text>

      <View className="mt-16 w-full px-6">
        <PrimaryButton
          title="Sign Up"
          onPress={() => navigation.navigate("Register")}
        />
      </View>

      <View className="flex-row gap-2 mt-8">
        <Text className="text-text-grey text-base font-medium">
          Already have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text className="text-primary-blueAccent text-base font-medium">
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Welcome;
