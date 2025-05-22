import { useNavigation } from "@react-navigation/native";
import { View, Text, Platform, Pressable } from "react-native";
import BackArrow from "../../../assets/icons/BackArrow";
import Input from "../../components/Input/Input";
import { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-primary-dark px-4"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <View className="px-4 flex-row justify-between items-center">
        <Pressable
          className="bg-primary-soft w-8 h-8 rounded-xl justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <BackArrow color="white" />
        </Pressable>

        <Text className="text-base text-white font-semibold">
          Change Password
        </Text>

        <View className="w-8 h-8" />
      </View>

      <View className="mt-16 gap-8">
        <View>
          <Input
            type="password"
            name="Current Password"
            placeholder="Enter your current password"
            value={currentPassword}
            setValue={setCurrentPassword}
            onFocus={() => handleFocus("currentPassword")}
          />
          {currentPassword && (
            <Text className="text-secondary-red text-sm mt-2 mx-2"></Text>
          )}
        </View>
        <View>
          <Input
            type="password"
            name="New Password"
            placeholder="Enter your new password"
            value={newPassword}
            setValue={setNewPassword}
            onFocus={() => handleFocus("newPassword")}
          />
          {newPassword && (
            <Text className="text-secondary-red text-sm mt-2 mx-2"></Text>
          )}
        </View>
        <View>
          <Input
            type="password"
            name="Confirm New Password"
            placeholder="Confirm your new password"
            value={confirmNewPassword}
            setValue={setConfirmNewPassword}
            onFocus={() => handleFocus("confirmNewPassword")}
          />
          {confirmNewPassword && (
            <Text className="text-secondary-red text-sm mt-2 mx-2"></Text>
          )}
        </View>
      </View>

      <View className="mt-10">
        <PrimaryButton title="Change Password" />
      </View>
    </View>
  );
};

export default ChangePassword;
