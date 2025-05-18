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
import SecondaryButton from "../components/Buttons/SecondaryButton";
import useAuthStore from "../../store/authStore";
import LockIcon from "../../assets/icons/LockIcon";
import NotificationIcon from "../../assets/icons/NotificationIcon";
import GlobeIcon from "../../assets/icons/GlobeIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import ShieldIcon from "../../assets/icons/ShieldIcon";
import QuestionIcon from "../../assets/icons/QuestionIcon";
import InfoAlertIcon from "../../assets/icons/InfoAlertIcon";

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
        icon: <LockIcon color="grey" />,
      },
    ],
  },
  {
    id: 2,
    title: "General",
    buttons: [
      {
        id: 1,
        title: "Notification",
        icon: <NotificationIcon color="grey" />,
      },
      {
        id: 2,
        title: "Language",
        icon: <GlobeIcon color="grey" />,
      },
      {
        id: 3,
        title: "Clear Cache",
        icon: <DeleteIcon color="grey" />,
      },
    ],
  },
  {
    id: 3,
    title: "More",
    buttons: [
      {
        id: 1,
        title: "Legal and Policies",
        icon: <ShieldIcon color="grey" />,
      },
      {
        id: 2,
        title: "Help & Feedback",
        icon: <QuestionIcon color="grey" />,
      },
      {
        id: 3,
        title: "About Us",
        icon: <InfoAlertIcon color="grey" />,
      },
    ],
  },
];

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <ScrollView
      className="flex-1 bg-primary-dark px-4"
      style={{ paddingTop: Platform.OS === "ios" ? 60 : 0 }}
    >
      <Text className="text-white text-base font-semibold text-center">
        Profile
      </Text>

      <View className="p-4 pr-5 border border-primary-soft rounded-[16px] mt-6 flex-row items-center justify-between gap-4">
        <View className="flex-row gap-4 items-center">
          <Image source={AvatarImage} className="w-[47px] h-[47px]" />

          <View className="gap-2">
            <Text className="text-white text-base font-semibold">
              Vako Kobulashvili
            </Text>
            <Text className="text-[#B1B1B1] text-cm font-medium">
              itzvakkoofficial@gmail.com
            </Text>
          </View>
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
            className="mt-6"
            data={section.buttons}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => <SettingsButton {...item} />}
            ItemSeparatorComponent={() => (
              <View className="w-[92%] h-px bg-primary-soft my-4 mx-auto" />
            )}
          />
        </View>
      ))}

      <View className="mt-10">
        <SecondaryButton title="Log Out" onPress={() => logout()} />
      </View>
    </ScrollView>
  );
};

export default Profile;
