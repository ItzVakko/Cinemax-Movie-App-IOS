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
import useFetch from "../../../hooks/useFetch";
import { fetchUpdateUserData } from "../../../services/userApi";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const user = useAuthStore((state) => state.user);

  const [avatar, setAvatar] = useState(user?.avatar);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const token = useAuthStore((state) => state.token);
  const updateData = useAuthStore((state) => state.dataUpdate);

  const { error, setError, finished, fetchData } = useFetch({
    fetchFunction: (userData) => fetchUpdateUserData(userData, token),
    onSuccess: () => updateData(),
  });

  const validateForm = () => {
    const newErrors = {};

    const fullNameChanged = fullName && fullName !== user?.fullName;
    const emailChanged =
      email && email.toLowerCase() !== user?.email?.toLowerCase();
    const avatarChanged = avatar && avatar !== user?.avatar;

    if (!fullNameChanged && !emailChanged && !avatarChanged) {
      newErrors.general = "You must change at least one field.";
    }

    if (fullNameChanged) {
      if (fullName.length < 3) {
        newErrors.fullName = "Full name must be at least 3 characters.";
      }
    }

    if (emailChanged) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.toLowerCase())) {
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

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const base64Image = result.assets[0].base64;

      try {
        const cloudinaryData = {
          file: `data:image/jpeg;base64,${base64Image}`,
          upload_preset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          cloud_name: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
        };

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cloudinaryData),
          }
        );

        const data = await uploadRes.json();
        setAvatar(data.secure_url);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      fetchData({
        fullName: fullName || user.fullName,
        email: email || user.email,
        avatar: avatar,
      });
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

      <TouchableOpacity className="mt-8 mx-auto" onPress={handlePickImage}>
        <Image
          source={{ uri: avatar }}
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
          {errors.fullName && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              {errors.fullName}
            </Text>
          )}
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
          {errors.email && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              {errors.email}
            </Text>
          )}

          {errors.general && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              {errors.general}
            </Text>
          )}

          {error && (
            <Text className="text-secondary-red text-sm mt-2 mx-2">
              Such email already exists!
            </Text>
          )}

          {finished && (
            <Text className="text-secondary-green text-sm mt-2 mx-2">
              User updated successfully!
            </Text>
          )}
        </View>
      </View>

      <View className="mt-10">
        <PrimaryButton title="Save Changes" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default EditProfile;
