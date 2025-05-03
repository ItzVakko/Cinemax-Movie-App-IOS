import { useNavigation } from "@react-navigation/native";
import { View, Text, Platform, Pressable, ScrollView } from "react-native";
import BackArrow from "../../../assets/icons/BackArrow";
import Input from "../../components/Input/Input";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useState } from "react";
import Checkbox from "expo-checkbox";

const Register = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
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
          Sign Up
        </Text>

        <View className="w-8 h-8" />
      </View>

      <Text className="text-2xl text-white font-semibold mt-10 mx-auto">
        Let’s get started
      </Text>
      <Text className="max-w-[195px] text-text-whiteGrey text-center font-medium mx-auto mt-2">
        The latest movies and series are here
      </Text>

      <View>
        <View className="mt-16 gap-8">
          <Input
            type="text"
            name="Full Name"
            placeholder="Enter your full name"
          />

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

        <View className="px-4 mt-4 flex-row gap-2">
          <Checkbox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
            }}
            color={toggleCheckBox && "#12CDD9"}
          />

          <Text className="text-text-grey text-[13px] max-w-[225px]">
            I agree to the{" "}
            <Text className="text-primary-blueAccent">Terms and Services</Text>{" "}
            and <Text className="text-primary-blueAccent">Privacy Policy</Text>
          </Text>
        </View>

        <View className="px-4 mt-10">
          <PrimaryButton title="Sign Up" />
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
