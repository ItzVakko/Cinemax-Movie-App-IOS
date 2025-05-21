import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Platform,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import BackArrow from "../../../assets/icons/BackArrow";
import useAuthStore from "../../../store/authStore";
import PencilIcon from "../../../assets/icons/PencilIcon";
import Input from "../../components/Input/Input";
import { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const user = useAuthStore((state) => state.user);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    } else if (fullName === user?.fullName) {
      newErrors.fullName = "Full name must be different.";
    }

    const lowEmail = email.toLowerCase();

    if (!lowEmail) {
      newErrors.email = "Email is required.";
    } else if (email === user?.email) {
      newErrors.email = "Email must be different.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(lowEmail)) {
        newErrors.email = "A valid email is required.";
      }
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
      //   fetchData({ fullName, email, password });
      setFullName("");
      setEmail("");
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
      <View className="px-4 flex-row justify-between items-center">
        <Pressable
          className="bg-primary-soft w-8 h-8 rounded-xl justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <BackArrow color="white" />
        </Pressable>

        <Text className="text-base text-white font-semibold">Edit Profile</Text>

        <View className="w-8 h-8" />
      </View>

      <TouchableOpacity className="mt-8 mx-auto">
        <Image
          source={{ uri: user?.avatar }}
          className="w-[72px] h-[72px] rounded-full"
        />
        <View className="absolute w-10 h-10 bg-primary-soft rounded-full right-[-6px] bottom-[-6px] justify-center items-center">
          <PencilIcon color="#12CDD9" />
        </View>
      </TouchableOpacity>

      <Text className="text-base text-white text-center font-semibold mt-6">
        {user?.fullName}
      </Text>
      <Text className="text-[#B1B1B1] text-center font-medium mt-2">
        {user?.email}
      </Text>

      <View className="mt-14 gap-8">
        <View>
          <Input
            type="text"
            name="Full Name"
            placeholder="Enter your new full name"
            value={fullName}
            setValue={setFullName}
            onFocus={() => handleFocus("fullName")}
          />
        </View>

        <View>
          <Input
            type="text"
            name="Email"
            placeholder="Enter your new email"
            value={email}
            setValue={setEmail}
            onFocus={() => handleFocus("email")}
          />
        </View>
      </View>

      <View className="mt-10">
        <PrimaryButton title="Save Changes" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default EditProfile;
