import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const InfoAlertIcon = ({ color }) => {
  return (
    <Svg
      width="21"
      height="21"
      viewBox="0 0 20 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_184_2884)">
        <Path
          d="M10 0C4.50742 0 0 4.50742 0 10C0 15.4926 4.50742 20 10 20C15.4926 20 20 15.4926 20 10C20 4.50742 15.4926 0 10 0ZM11.1719 14.6875C11.1719 15.3335 10.646 15.8594 10 15.8594C9.35398 15.8594 8.82812 15.3335 8.82812 14.6875V8.82812C8.82812 8.18211 9.35398 7.65625 10 7.65625C10.646 7.65625 11.1719 8.18211 11.1719 8.82812V14.6875ZM10 6.48438C9.35398 6.48438 8.82812 5.95852 8.82812 5.3125C8.82812 4.66648 9.35398 4.14062 10 4.14062C10.646 4.14062 11.1719 4.66648 11.1719 5.3125C11.1719 5.95852 10.646 6.48438 10 6.48438Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_184_2884">
          <Rect width="20" height="20" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default InfoAlertIcon;
