import { View, Text } from "react-native";
import React from "react";

interface infoBoxProps {
  title?: any;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}

const InfoBox: React.FC<infoBoxProps> = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sam text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
