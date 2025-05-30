import React from "react";
import Svg, { Path } from "react-native-svg";

const HouseIcon = ({ color }) => {
  return (
    <Svg
      width="22"
      height="20"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.0001 16V11H12.0001V16C12.0001 16.55 12.4501 17 13.0001 17H16.0001C16.5501 17 17.0001 16.55 17.0001 16V9H18.7001C19.1601 9 19.3801 8.43 19.0301 8.13L10.6701 0.600001C10.2901 0.260001 9.7101 0.260001 9.3301 0.600001L0.970098 8.13C0.630098 8.43 0.840098 9 1.3001 9H3.0001V16C3.0001 16.55 3.4501 17 4.0001 17H7.0001C7.5501 17 8.0001 16.55 8.0001 16Z"
        fill={color}
      />
    </Svg>
  );
};

export default HouseIcon;
