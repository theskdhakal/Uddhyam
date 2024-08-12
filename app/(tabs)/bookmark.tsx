import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts, getUserSavedPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";

const BookMark = () => {
  const { user } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(async () => {
    if (user) {
      return await getUserSavedPosts(user?.id);
    } else {
      return null;
    }
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => <VideoCard videoItem={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Liked Videos
            </Text>
            <Text className="text-2xl font-psemibold text-white">{}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Saved videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default BookMark;
