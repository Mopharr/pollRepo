import { useState, useEffect } from "react";
import { handlePrivateRequest } from "../utils/http";
import { UserAuth } from "../context/AuthContext";
import { UserProfile } from "../types/auth";
import useAxiosPrivate from "./useAxiosPrivate";

export type Profile = {
  id: string;
  display_name: string;
  username: string;
  profile_photo_url: string;
  cover_image_url: string;
  twitter_handle: string;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  is_follower: boolean;
  votes_count: number;
  polls_count: number;
  points: number;
  topic_points: {
    [key: string]: {
      level: string;
      points: number;
    };
  };
  bio: string;
  level: string;
};

const useGetProfile = (loggedinUser: boolean, username: string) => {
  useAxiosPrivate();
  const { userProfile, isAuthenticated } = UserAuth();

  const [profile, setProfile] = useState<Profile | UserProfile | null>(null);

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const data = (await handlePrivateRequest(
          "get",
          `/profiles/profile/${username}`
        )) as any;

        const profileData = data as Profile;
        setProfile(profileData);
      } catch (error: any) {
        console.log(error?.response?.data);
        if (!error?.response) {
          console.log("Check your internet connection");
        }
        if (error?.response) {
          console.log("Error fetching your profile info");
        }
      }
    };
    if (!loggedinUser) {
      if (isAuthenticated) {
        handleGetProfile();
      }
    } else {
      setProfile(userProfile);
    }
  }, [username, loggedinUser, userProfile, isAuthenticated]);

  return { profile, setProfile };
};

export default useGetProfile;
