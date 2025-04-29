import { View, FlatList } from "react-native";
import React, { useState } from "react";
import PillButton from "../Buttons/PillButton";

const data = [
  {
    id: null,
    name: "All",
  },
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
];

const Categories = ({ onSelectedGenre }) => {
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
            onPress={() => {
              setActive(item.name);
              onSelectedGenre(item.id);
            }}
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
