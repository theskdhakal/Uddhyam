import { Link } from "expo-router";
import { Text, View } from "react-native";

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-center text-3xl">Home</Text>
      <Link href="/profile">Go to Profile</Link>
    </View>
  );
};

export default Home;
