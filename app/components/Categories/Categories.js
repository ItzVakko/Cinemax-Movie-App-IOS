import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import PillButton from "../Buttons/PillButton";

const data = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Comedy",
  },
  {
    id: 3,
    name: "Animation",
  },
  {
    id: 4,
    name: "Document",
  },
  {
    id: 5,
    name: "Horror",
  },
  {
    id: 6,
    name: "Adventure",
  },
];

const Categories = () => {
  const [active, setActive] = useState("All");
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        const isActive = active === item.name;
        return (
          <PillButton
            title={item.name}
            active={isActive}
            onPress={() => setActive(item.name)}
          />
        );
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={<View className="w-2"></View>}
      className="mx-4"
    />
  );
};

export default Categories;
