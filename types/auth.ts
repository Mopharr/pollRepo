export type FormData = {
  display_name: string;
  username: string;
  email: string;
  // phone_number: string;
  interests: number[];
  birth_date: string;
  gender: string;
  password1: string;
  password2: string;
  occupation: string;
  ethnicity: string;
  marital_status: string;
  country: string;
  city: string;
  state: string;
};

type Demographics = { [key: string]: string };

export type ProfileData = {
  display_name: string;
  username: string;
  gender: string;
  income: string;
  education: string;
  ethnicity: string;
  marital_status: string;
  birth_date: string;
  country: string;
  city: string;
  state: string;
  employment_status: string;
  occupation: string;
  fav_sport: string;
  hobbies: string;
  fav_music: string;
  dietary_pref: string;
  physical_level: string;
  fav_book: string;
  social_media_usage: string;
  fav_movie: string;
  travel_freq: string;
  pet_ownership: string;
  bio: string;
  is_private_votes: boolean;
  is_private_polls: boolean;
  cover_image: File | string;
  profile_photo: File | string;
};

export type UserProfile = {
  id: string;
  display_name: string;
  username: string;
  email: string;
  phone_number: string;
  profile_photo_url: string;
  cover_image_url: string;
  twitter_handle: string;
  points: number;
  interests: [];
  topic_points: {
    [key: string]: {
      level: string;
      points: number;
    };
  };
  level: string;
  bio: string;
  is_private_votes: boolean;
  is_private_polls: boolean;
  following_count: number;
  followers_count: number;
  is_following: boolean;
  is_follower: boolean;
  votes_count: number;
  polls_count: number;
  demographics: Demographics;
};
