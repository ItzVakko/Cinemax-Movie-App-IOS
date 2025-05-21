import { View, Text, ScrollView, Platform, Pressable } from "react-native";
import BackArrow from "../../../assets/icons/BackArrow";
import Input from "../../components/Input/Input";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useState } from "react";
import { fetchLogin } from "../../../services/authApi";
import useAuthStore from "../../../store/authStore";
import useFetch from "../../../hooks/useFetch";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const login = useAuthStore((state) => state.login);

  const { error, setError, finished, fetchData } = useFetch({
    fetchFunction: fetchLogin,
    onSuccess: (res) => login(res.user, res.token),
  });

  const validateForm = () => {
    const newErrors = {};

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

  const handleLogin = () => {
    if (validateForm()) {
      fetchData({ email, password });
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
          Login
        </Text>

        <View className="w-8 h-8" />
      </View>

      <Text className="text-2xl text-white font-semibold mt-10 tracking-[2px] mx-auto">
        CINEMAX
      </Text>
      <Text className="max-w-[195px] text-text-whiteGrey text-center font-medium mx-auto mt-2">
        Welcome back! Please enter your details.
      </Text>

      <View>
        <View className="mt-16 gap-8 px-4">
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
                Please insert correct email and password.
              </Text>
            )}

            {finished && (
              <Text className="text-secondary-green text-sm mt-2 mx-2">
                Logged in successfully!
              </Text>
            )}
          </View>
        </View>

        <Pressable>
          <Text className="text-primary-blueAccent text-[13px] font-medium self-end mx-5 mt-2">
            Forgot Password?
          </Text>
        </Pressable>

        <View className="px-4 mt-10">
          <PrimaryButton title="Login" onPress={handleLogin} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
