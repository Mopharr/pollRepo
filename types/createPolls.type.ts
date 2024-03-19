// types.ts
export interface Choice {
  choice_text: string;
  content: string;
  is_correct: boolean;
}

export interface PollRequest {
  question: string;
  content: string;
  tags: string[];
  choices: Choice[];

  collaborative: boolean;

  demographic_criteria: Record<string, unknown>;
  deadline: string | null;
}

export interface AuthorInfo {
  id: string;
  user_name?: string;
  username?: string;
}

export interface PollChoice extends Choice {
  id: number;
  slug: string;
  author_info: AuthorInfo;
  poll_question: string;
  vote_count: number;
  created_at: string;
  updated_at: string;
}

export interface PollResponse {
  status_code: number;
  Poll: {
    id: string;
    slug: string;
    question: string;
    content: string;
    tags: string[];
    choices: PollChoice[];
    author_info: AuthorInfo;
    views: number;
    monitors_count: number;
    votes_count: number;
    display_result: boolean;
    is_flagged: boolean;
    is_boosted: boolean;
    is_ended: boolean;
    has_voted: boolean;
    collaborative: boolean;
    review_status: "UR";
    is_legacy: boolean;
    added_by_admin: boolean;
    can_vote: [boolean, string];
    demographic_criteria: Record<string, unknown>;
    interests: string[];
    deadline: string;
    comments_count: number;
    created_at: string;
    updated_at: string;
  };
}
