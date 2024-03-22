import { useEffect, useRef, useState } from "react";
import { Container } from "@/ui";
import PlaceholderCover from "@/asset/image/PlaceholderCover.jpg";
import PlaceholderProfile from "@/asset/image/PlaceholderProfile.jpg";
import { useRouter } from "next/router";
import { abbreviateNumber } from "js-abbreviation-number";
import { FaPencil } from "react-icons/fa6";
import LevelIcon from "@/components/LevelIcon/LevelIcon";
// import MainContent from "../components/MainConent/MainContent";
import styles from "@/styles/Profile.module.css";
import useGetProfile, { Profile as ProfileData } from "@/hooks/useGetProfile";
// import { useFilter } from "../context/FilterContext";
import { PollData } from "@/types/fetchPolls.type";
// import ProfilePolls from "../components/ProfileComponents/ProfilePolls";
import useGetPoll from "@/hooks/useGetPoll";
import PollsList from "@/components/PollsList/PollsList";
import { UserProfile } from "@/types/auth";
import { handlePrivateRequest } from "@/utils/http";
import { UserAuth } from "@/context/AuthContext";
import useNotify from "@/hooks/useNotify";
import Image from "next/image";

type TopicPoints = {
  title: string;
  level: string;
  points: number;
};
interface PollsListProps {
  data: PollData[];
  fetchMoreData: () => Promise<void>;
  isFetchingMore: boolean;
  hasMore: boolean;
  setData: React.Dispatch<React.SetStateAction<PollData[]>>;
}

const PollsComponent: React.FC<PollsListProps> = ({
  data,
  fetchMoreData,
  isFetchingMore,
  hasMore,
  setData,
}) => {
  // Polls component logic
  return (
    <>
      {data.length > 0 ? (
        <PollsList
          data={data}
          isFetchingMore={isFetchingMore}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
          setData={setData}
        />
      ) : (
        <p className={styles.emptyText}>No available polls</p>
      )}
    </>
  );
};

const VotesComponent: React.FC<PollsListProps> = ({
  data,
  fetchMoreData,
  isFetchingMore,
  hasMore,
  setData,
}) => {
  return (
    <>
      {data.length > 0 ? (
        <PollsList
          data={data}
          isFetchingMore={isFetchingMore}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
          setData={setData}
        />
      ) : (
        <p className={styles.emptyText}>No available votes </p>
      )}
    </>
  );
};

const Profile = () => {
  // const { data, fetchMoreData, setData, isFetchingMore, hasMore } = useFilter();

  const router = useRouter();

  const notify = useNotify();

  const [activeTab, setActiveTab] = useState("polls");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMoreBtn, setShowReadMoreBtn] = useState(false);

  const { sessionId } = UserAuth();

  const { username } = router.query;
  const usernameString =
    typeof username === "string"
      ? username
      : Array.isArray(username)
      ? username[0]
      : undefined;

  const loggedinUser = username === "me";

  const { profile: userProfile, setProfile } = useGetProfile(
    loggedinUser,
    usernameString!
  );

  const {
    data: userPolls,
    fetchMoreData: fetchMoreUserPolls,
    isFetchingMore: isFetchingMorePolls,
    hasMore: hasMorePolls,
    setData: setUserPolls,
  } = useGetPoll(loggedinUser, usernameString!, "polls");

  const {
    data: userVotes,
    fetchMoreData: fetchMoreUserVotes,
    isFetchingMore: isFetchingMoreVotes,
    hasMore: hasMoreVotes,
    setData: setUserVotes,
  } = useGetPoll(loggedinUser, usernameString!, "votes");

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "polls":
        return (
          <PollsComponent
            data={userPolls}
            isFetchingMore={isFetchingMorePolls}
            fetchMoreData={fetchMoreUserPolls}
            hasMore={hasMorePolls}
            setData={setUserPolls}
          />
        );
      case "votes":
        return (
          <VotesComponent
            data={userVotes}
            isFetchingMore={isFetchingMoreVotes}
            fetchMoreData={fetchMoreUserVotes}
            hasMore={hasMoreVotes}
            setData={setUserVotes}
          />
        );
      default:
        return null;
    }
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const bioRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (bioRef.current) {
      setShowReadMoreBtn(
        bioRef.current.scrollHeight !== bioRef.current.clientHeight
      );
    }
  }, []);

  let topicPoints: TopicPoints[] = [];

  for (const key in userProfile?.topic_points) {
    const data: TopicPoints = {
      title: key,
      level: userProfile?.topic_points[key].level!,
      points: userProfile?.topic_points[key].points!,
    };
    topicPoints.push(data);
  }

  const handleFollow = async () => {
    try {
      await handlePrivateRequest(
        "post",
        `/profiles/${userProfile?.id}/follow/`
      );

      const existingProfile = { ...userProfile } as ProfileData | UserProfile;
      existingProfile.is_following = true;
      setProfile(existingProfile);
    } catch (error: any) {
      console.log(error?.response?.data);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify(error?.response?.data?.message, "error", {
          toastId: sessionId,
        });
      }
    }
  };

  const handleUnfollow = async () => {
    const result = window.confirm(
      `Are you sure you want to unfollow ${userProfile?.username}`
    );

    if (!result) {
      return;
    }

    try {
      await handlePrivateRequest(
        "post",
        `/profiles/${userProfile?.id}/unfollow/`
      );
      const existingProfile = { ...userProfile } as ProfileData | UserProfile;
      existingProfile.is_following = false;
      setProfile(existingProfile);
    } catch (error: any) {
      console.log(error?.response?.data);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify(error?.response?.data?.message, "error", {
          toastId: sessionId,
        });
      }
    }
  };
  return (
    <main className={styles.main}>
      <section className={styles.photoSection}>
        <Container className={styles.containerTop}>
          <div className={styles.coverImage}>
            <Image
              src={userProfile?.cover_image_url || PlaceholderCover}
              alt="cover_image"
              layout="fill"
              // objectFit="cover"
            />
          </div>

          <div className={styles.profilePhoto}>
            <div>
              {/* <Image
                src={
                  (userProfile?.profile_photo_url
                    ? userProfile?.profile_photo_url
                    : PlaceholderProfile) as string
                }
                alt="profile_picture"
              /> */}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.content}>
        <Container className={styles.containerTop}>
          <div className={styles.profileBody}>
            <div className={styles.leftPanel}>
              <div className={styles.panelContent}>
                <div className={styles.userAction}>
                  <div className={styles.name}>
                    {userProfile?.display_name && (
                      <p className={styles.displayName}>
                        {userProfile?.display_name}
                      </p>
                    )}

                    <p className={styles.username}>@{userProfile?.username}</p>
                  </div>

                  {!loggedinUser && !userProfile?.is_following && (
                    <button className={styles.follow} onClick={handleFollow}>
                      Follow
                    </button>
                  )}

                  {!loggedinUser && userProfile?.is_following && (
                    <button
                      className={styles.following}
                      onClick={handleUnfollow}
                    >
                      Following
                    </button>
                  )}
                </div>

                <div className={styles.about}>
                  <p className={styles.title}>About Me:</p>
                  {userProfile?.bio && (
                    <p>
                      <span
                        className={`${styles.info} ${
                          isExpanded ? "" : styles.expanded
                        }`}
                        ref={bioRef}
                      >
                        {userProfile?.bio}{" "}
                      </span>

                      {showReadMoreBtn && (
                        <span>
                          <button
                            className={styles.viewMore}
                            onClick={toggleExpanded}
                          >
                            {isExpanded ? "Read less" : "Read more"}
                          </button>
                        </span>
                      )}
                    </p>
                  )}
                </div>

                <div className={styles.stats}>
                  <div>
                    <p>
                      {userProfile?.followers_count &&
                        abbreviateNumber(userProfile?.followers_count!, 2)}
                    </p>
                    <p>Followers</p>
                  </div>
                  <div>
                    <p>
                      {userProfile?.following_count &&
                        abbreviateNumber(userProfile?.following_count!, 2)}
                    </p>
                    <p>Following</p>
                  </div>
                  <div>
                    <p>
                      {userProfile?.polls_count &&
                        abbreviateNumber(userProfile?.polls_count!, 2)}
                    </p>
                    <p>Polls</p>
                  </div>
                  <div>
                    <p>
                      {userProfile?.votes_count &&
                        abbreviateNumber(userProfile?.votes_count!, 2)}
                    </p>
                    <p>Votes</p>
                  </div>

                  {userProfile?.level && (
                    <div className={styles.level}>
                      <div>
                        {userProfile?.level && (
                          <LevelIcon level={userProfile?.level} />
                        )}
                        <span>
                          {userProfile?.points &&
                            abbreviateNumber(userProfile?.points!, 2)}
                          pts
                        </span>
                      </div>
                      <p className={styles.levelTitle}>{userProfile?.level}</p>

                      <div className={styles.toolTip}>
                        {topicPoints.map((item, index) => (
                          <div className={styles.otherLevels} key={index}>
                            <p>{item.title}</p>
                            <div>
                              <LevelIcon level={item.level} />
                              <span>
                                {abbreviateNumber(item.points!, 2)}pts
                              </span>
                              <p className={styles.levelSubTitle}>
                                {item.level}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.rightPanel}>
              <div className={styles.nav}>
                <div className={styles.tabs}>
                  <button
                    className={activeTab === "polls" ? styles.active : ""}
                    onClick={() => setActiveTab("polls")}
                  >
                    Polls
                  </button>
                  {/* <button
                    className={activeTab === "replies" ? styles.active : ""}
                    onClick={() => setActiveTab("replies")}
                  >
                    Replies
                  </button> */}
                  <button
                    className={activeTab === "votes" ? styles.active : ""}
                    onClick={() => setActiveTab("votes")}
                  >
                    Votes
                  </button>
                </div>

                {loggedinUser && (
                  <button
                    className={styles.editProfile}
                    onClick={() => router.push("/edit-profile")}
                  >
                    Edit Profile
                  </button>
                )}

                {loggedinUser && (
                  <button
                    className={styles.edit}
                    onClick={() => router.push("/edit-profile")}
                  >
                    <FaPencil size={28} />
                  </button>
                )}
              </div>

              <div className={styles.tabContent}>
                {renderActiveTabContent()}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Profile;
