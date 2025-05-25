import { useNavigation } from "@react-navigation/native";
import { View, Text, Platform, Pressable } from "react-native";
import BackArrow from "../../../assets/icons/BackArrow";
import Input from "../../components/Input/Input";
import { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import useAuthStore from "../../../store/authStore";
import useFetch from "../../../hooks/useFetch";
import { fetchUpdateUserData } from "../../../services/userApi";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const { error, setError, finished, fetchData } = useFetch({
    fetchFunction: (userData) => fetchUpdateUserData(userData, token),
    onSuccess: () => logout(),
  });

  const validateForm = () => {
    const newErrors = {};

    if (
      currentPassword &&
      newPassword &&
      confirmNewPassword &&
      currentPassword === newPassword
    ) {
      newErrors.general = "New password must not match the old one!";
    }

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else {
      if (newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters.";
      } else if (newPassword.length > 12) {
        newErrors.newPassword = "Password must be up to 12 characters.";
      }
    }

    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = "New password is required.";
    } else if (confirmNewPassword !== newPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      fetchData({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const handleFocus = (type) => {
    setError(null);
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  return (
    <View
      className="flex-1 bg-primary-dark px-4"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <View className="flex-row justify-between items-center">
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
          {errors.currentPassword && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              {errors.currentPassword}
            </Text>
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
          {errors.newPassword && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              {errors.newPassword}
            </Text>
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
          {errors.confirmNewPassword && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              {errors.confirmNewPassword}
            </Text>
          )}

          {errors.general && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              {errors.general}
            </Text>
          )}

          {error && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              Current password is incorrect!
            </Text>
          )}

          {finished && (
            <Text className="text-secondary-green text-sm mt-2 mx-2">
              Password changed successfully!
            </Text>
          )}
        </View>
      </View>

      <View className="mt-10">
        <PrimaryButton title="Change Password" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default ChangePassword;
