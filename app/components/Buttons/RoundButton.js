import { TouchableOpacity } from "react-native";

const RoundButton = ({ icon }) => {
  return (
    <TouchableOpacity className="w-12 h-12 bg-primary-soft justify-center items-center rounded-full">
      {icon}
    </TouchableOpacity>
  );
};

export default RoundButton;
