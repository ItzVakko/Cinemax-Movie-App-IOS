import { View, Text, ScrollView, Platform, Pressable } from "react-native";
import BackArrow from "../../../assets/icons/BackArrow";
import Input from "../../components/Input/Input";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const Login = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      className="bg-primary-dark flex-1"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <View className="px-4 flex-row justify-between items-center">
        <Pressable
          className="bg-primary-soft w-8 h-8 rounded-xl justify-center items-center"
          onPress={() => navigation.navigate("Welcome")}
        >
          <BackArrow color="white" />
        </Pressable>

        <Text className="text-base text-white font-semibold self-center">
          Login
        </Text>

        <View className="w-8 h-8" />
      </View>

      <Text className="text-2xl text-white font-semibold mt-10 tracking-[2px] mx-auto">
        CINEMAX
      </Text>
      <Text className="max-w-[195px] text-text-whiteGrey text-center font-medium mx-auto mt-2">
        Welcome back! Please enter your details.
      </Text>

      <View>
        <View className="mt-16 gap-8">
          <Input
            type="text"
            name="Email Address"
            placeholder="Enter your email"
          />

          <Input
            type="password"
            name="Password"
            placeholder="Enter your password"
          />
        </View>

        <Pressable>
          <Text className="text-primary-blueAccent text-[13px] font-medium self-end mx-5 mt-2">
            Forgot Password?
          </Text>
        </Pressable>

        <View className="px-4 mt-10">
          <PrimaryButton title="Login" />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
