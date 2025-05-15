import { View, Text, ScrollView, Platform } from "react-native";

const Profile = () => {
  return (
    <ScrollView
      className="flex-1 bg-primary-dark px-4"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <Text className="text-white text-base font-semibold text-center">
        Profile
      </Text>
    </ScrollView>
  );
};

export default Profile;
