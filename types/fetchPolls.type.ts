export interface AuthorInfo {
  profile_picture: string | undefined;
  id: string;
  username?: string;
  user_name?: string;
  is_following: boolean;
  is_follower: string;
}
export interface Choice {
  choice_icon_thumbnail: string | undefined;
  selected_choice: any;
  id: number;
  slug: string;
  author_info: AuthorInfo;
  choice_text: string;
  poll_question: string;
  content: string;
  vote_count: number;
  created_at: string;
  updated_at: string;
  review_status: string;
  choice_icon_url: string;
}

export interface PollData {
  id: number;
  slug: string;
  question: string;
  content: string;
  tags: string[];
  choices: Choice[];
  author_info: AuthorInfo;
  views: number;
  monitors_count: number;
  votes_count: number;
  recent_votes_count: number;
  display_result: boolean;
  privacy: string;
  is_flagged: boolean;
  is_boosted: boolean;
  is_ended: boolean;
  is_monitored: boolean;
  has_voted: boolean;
  collaborative: boolean;
  review_status: string;
  is_legacy: boolean;
  added_by_admin: boolean;
  can_vote: [boolean, string];
  demographic_criteria: Record<string, unknown>;
  interests: any[];
  deadline: string;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface PollMetadata {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PollResponse {
  results: { results: any; count: any; next: any; previous: any };
  status_code: number;
  Poll: {
    results: PollData[];
  } & PollMetadata;
}
export interface TrendsResponse {
  results: PollData[];
  count: number;
  next: string;
  previous: string | null;
}

export interface VotePollRequest {}
