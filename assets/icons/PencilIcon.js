import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const PencilIcon = ({ color }) => {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_225_12336)">
        <Path
          d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_225_12336">
          <Rect width="24" height="24" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PencilIcon;
