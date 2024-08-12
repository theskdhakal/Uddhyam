import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useGlobalContext } from "@/context/GlobalProvider";
import { updateVideo } from "@/lib/appwrite";

const VideoCard = ({
  videoItem: {
    $id,
    title,
    thumbnail,
    video,
    user: { username, avatar },
  },
}) => {
  const [menuClicked, setMenuClicked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [play, setPlay] = useState(false);

  const { user: consumer } = useGlobalContext();

  const handleOnClickSave = async (videoId: string) => {
    if (consumer?.id) {
      await updateVideo(videoId, consumer.id);
      setIsSaved(true);
    } else {
      Alert.alert("Error", "User not logged in !");
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <TouchableOpacity
            onPress={() => setMenuClicked((prev) => !prev)}
            className="relative flex flex-row items-center "
          >
            {menuClicked && (
              <TouchableOpacity
                className="pt-5"
                onPress={() => handleOnClickSave($id)}
              >
                {isSaved ? (
                  <Text className="bg-white px-4 py-1 font-pmedium">
                    Remove
                  </Text>
                ) : (
                  <Text className="bg-white px-4 py-1 font-pmedium">Save</Text>
                )}
              </TouchableOpacity>
            )}
            <Image
              source={icons.menu}
              className="w-5 h-5 "
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ("didJustFinish" in status && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
