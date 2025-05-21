import { useNavigation } from "@react-navigation/native";
import { View, Text, Platform, Pressable, ScrollView } from "react-native";
import BackArrow from "../../../assets/icons/BackArrow";
import Input from "../../components/Input/Input";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import useAuthStore from "../../../store/authStore";
import { fetchRegister } from "../../../services/authApi";
import useFetch from "../../../hooks/useFetch";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const navigation = useNavigation();
  const login = useAuthStore((state) => state.login);

  const { error, setError, finished, fetchData } = useFetch({
    fetchFunction: fetchRegister,
    onSuccess: (res) => login(res.user, res.token),
  });

  const validateForm = () => {
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    const lowEmail = email.toLowerCase();

    if (!lowEmail) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(lowEmail)) {
        newErrors.email = "A valid email is required.";
      }
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else {
      if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      } else if (password.length > 12) {
        newErrors.password = "Password must be up to 12 characters.";
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

  const handleRegister = () => {
    if (validateForm()) {
      fetchData({ fullName, email, password });
      setFullName("");
      setEmail("");
      setPassword("");
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
        <View className="mt-16 gap-8 px-4">
          <View>
            <Input
              type="text"
              name="Full Name"
              placeholder="Enter your full name"
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
              name="Email Address"
              placeholder="Enter your email"
              value={email}
              setValue={setEmail}
              onFocus={() => handleFocus("email")}
            />
            {errors.email && (
              <Text className="text-secondary-red text-sm mt-2 mx-2">
                {errors.email}
              </Text>
            )}
          </View>

          <View>
            <Input
              type="password"
              name="Password"
              placeholder="Enter your password"
              value={password}
              setValue={setPassword}
              onFocus={() => handleFocus("password")}
            />
            {errors.password && (
              <Text className="text-secondary-red text-sm mt-2 mx-2">
                {errors.password}
              </Text>
            )}

            {error && (
              <Text className="text-secondary-red text-sm mt-2 mx-2">
                Account with the same email already exists.
              </Text>
            )}

            {finished && (
              <Text className="text-secondary-green text-sm mt-2 mx-2">
                Signed Up successfully!
              </Text>
            )}
          </View>
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
          <PrimaryButton title="Sign Up" onPress={handleRegister} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
