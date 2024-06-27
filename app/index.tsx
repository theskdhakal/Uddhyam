import { Image, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="mX-w-[380px] W-FULL h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-4">
            <Text className="text-3xl text-white font-bold text-center">
              Dicover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Uddhyam</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[115px] absolute top-14 right-14  "
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center ">
            Where efforts meet the dream:start journey of your dream career
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
