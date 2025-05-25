import { useNavigation } from "@react-navigation/native";
import { View, Text, Platform, Pressable, ScrollView } from "react-native";
import BackArrow from "../../../assets/icons/BackArrow";

const AboutUs = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
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

        <Text className="text-base text-white font-semibold">About Us</Text>

        <View className="w-8 h-8" />
      </View>

      <View className="mt-6">
        <Text className="text-base text-white font-semibold">App Info</Text>

        <Text className="text-sm text-text-grey font-medium mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare
          quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien,
          consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam
          est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
        </Text>

        <Text className="text-sm text-text-grey font-medium mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare
          quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien,
          consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam
          est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
        </Text>

        <Text className="text-base text-white font-semibold mt-6">
          Our Goal
        </Text>

        <Text className="text-sm text-text-grey font-medium mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare
          quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien,
          consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam
          est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
        </Text>

        <Text className="text-sm text-text-grey font-medium mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare
          quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien,
          consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam
          est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
