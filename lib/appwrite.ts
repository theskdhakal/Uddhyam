import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
  ImageGravity,
} from "react-native-appwrite";

interface userProps {
  email: "";
  password: "";
  username?: "";
}

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.uddhyam",
  projectId: "6683654a001500d3c309",
  databaseId: "66838cea0012cf6c9e93",
  userCollectionId: "66838d0100181e9def4e",
  videosCollectionId: "66838d350007992d3259",
  storageId: "6685def400398192037b",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({ email, password, username }: userProps) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async ({ email, password }: userProps) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchPosts = async (query: "") => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId: "") => {
  console.log("userId is:", userId);
  try {
    const response = await databases.listDocuments(
      databaseId,
      videosCollectionId
    );

    const data = response.documents;
    console.log(data);

    const posts = data.filter((item) => item.user.$id === userId);
    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    console.log("uploadfile", uploadedFile);
    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createVideo = async (formData) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(formData.thumbnail, "image"),
      uploadFile(formData.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videosCollectionId,
      ID.unique(),
      {
        title: formData.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: formData.prompt,
        user: formData.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};
