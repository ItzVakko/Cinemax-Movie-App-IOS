import {
  View,
  Text,
  ScrollView,
  Platform,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import AvatarImage from "../../assets/images/avatar.png";
import PersonIcon from "../../assets/icons/PersonIcon";
import EditIcon from "../../assets/icons/EditIcon";
import SettingsButton from "../components/Buttons/SettingsButton";

const sections = [
  {
    id: 1,
    title: "Account",
    buttons: [
      {
        id: 1,
        title: "Member",
        icon: <PersonIcon color="#12CDD9" />,
      },
      {
        id: 2,
        title: "Change Password",
        icon: <EditIcon color="#12CDD9" />,
      },
    ],
  },
];

const Profile = () => {
  return (
    <ScrollView
      className="flex-1 bg-primary-dark px-4"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <Text className="text-white text-base font-semibold text-center">
        Profile
      </Text>

      <View className="p-4 pr-5 border border-primary-soft rounded-[16px] mt-6 flex-row items-center justify-between gap-4">
        <Image source={AvatarImage} className="w-[55px] h-[55px]" />

        <View className="gap-2">
          <Text className="text-white text-base font-semibold">
            Vako Kobulashvili
          </Text>
          <Text className="text-[#B1B1B1] text-cm font-medium">
            itzvakkoofficial@gmail.com
          </Text>
        </View>

        <Pressable>
          <EditIcon color="#12CDD9" />
        </Pressable>
      </View>

      {sections.map((section) => (
        <View
          className="py-6 px-5 pr-5 border border-primary-soft rounded-[16px] mt-6"
          key={section.id}
        >
          <Text className="text-white text-[18px] font-semibold">
            {section.title}
          </Text>

          <FlatList
            data={section.buttons}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => <SettingsButton {...item} />}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Profile;
