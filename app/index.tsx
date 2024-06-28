import { Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[180px] h-[100px]"
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
              <Text className="text-secondary-100">Uddhyam</Text>
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
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#051029" style="light" />
    </SafeAreaView>
  );
};

export default Home;
