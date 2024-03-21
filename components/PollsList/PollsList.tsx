import React, { useState, useEffect, MouseEvent } from "react";
import styles from "../MainConent/styles.module.css";
// import { FaRegComment } from "react-icons/fa";
import { TiBookmark } from "react-icons/ti";
import { LiaStreetViewSolid } from "react-icons/lia";
import { FaRegShareFromSquare } from "react-icons/fa6";
import DescriptionIcon from "../../asset/svg/decscrip.svg";
import { Button, Modal } from "antd";
import { GoDotFill } from "react-icons/go";
import AddOptions from "../Modals/AddOptions";
import ProgressBar from "../ProgressBar/ProgressBar";
import Link from "next/link";
// import ShareModal from "../Modals/ShareModal";
import { useVote } from "../../hooks/poll/useVote";
import dummy from "../../asset/image/dummy.webp";
import { Choice, PollData } from "../../types/fetchPolls.type";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { useRouter } from "next/router";
import { abbreviateNumber } from "js-abbreviation-number";
import useNotify from "../../hooks/useNotify";
import { handlePrivateRequest } from "../../utils/http";
import { UserAuth } from "../../context/AuthContext";
import Iframe from "react-iframe";
import MediaUrl from "../Modals/MediaUrl";
import Crown from "../../asset/image/crown.png";
import YouTube, { YouTubeProps } from "react-youtube";
import Image from "next/image";

interface PollsListProps {
  data: PollData[];
  setData?: React.Dispatch<React.SetStateAction<PollData[]>>;
  fetchMoreData: () => Promise<void>;
  isFetchingMore: boolean;
  hasMore: boolean;
}

const PollsList: React.FC<PollsListProps> = ({
  data,
  setData,
  fetchMoreData,
  hasMore,
}) => {
  const { sessionId, isAuthenticated, handleShowAuthModal } = UserAuth();
  const [showFullText, setShowFullText] = useState<Record<number, boolean>>({});
  const [showUndo, setShowUndo] = useState<Record<number, boolean>>({});

  const [isAddOptionsModalVisible, setIsAddOptionsModalVisible] =
    useState(false);

  const [activeOption, setActiveOption] = useState<{
    pollId: number;
    optionIndex: number;
  } | null>(null);
  const [showAllOptions, setShowAllOptions] = useState<Record<number, boolean>>(
    {}
  );

  const [getOptions, setGetOptions] = useState([]);
  const [originalPollData, setOriginalPollData] = useState<any[]>(data);
  const { vote, unVote, error } = useVote();

  const notify = useNotify();

  const BASE_URL = "https://pollrepo.com";

  const handleCopyLink = (e: MouseEvent<HTMLButtonElement>, slug: string) => {
    navigator.clipboard.writeText(BASE_URL + `/${slug}`).then(
      (success) => notify("copied to clipboard", "success"),
      (err) => notify("Error copying to clipboard", "error")
    );
    e.currentTarget.blur();
  };

  const handleBookmark = async (id: number, slug: string) => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }

    const existingPollData: PollData[] = [...data];
    const index = existingPollData.findIndex((poll) => poll.id === id);

    if (existingPollData[index].is_monitored === false) {
      existingPollData[index].monitors_count++;
    } else {
      existingPollData[index].monitors_count--;
    }

    existingPollData[index].is_monitored = existingPollData[index].is_monitored
      ? false
      : true;
    setData && setData(existingPollData);
    try {
      await handlePrivateRequest("post", `/monitors/toggle_monitor/${slug}/`);
    } catch (error: any) {
      // console.log(error?.response?.data);
      const existingPollData: PollData[] = [...data];
      const index = existingPollData.findIndex((poll) => poll.id === id);

      if (existingPollData[index].is_monitored === false) {
        existingPollData[index].monitors_count++;
      } else {
        existingPollData[index].monitors_count--;
      }

      existingPollData[index].is_monitored = existingPollData[index]
        .is_monitored
        ? false
        : true;
      setData && setData(existingPollData);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify(error?.response?.data[0], "error", {
          toastId: sessionId,
        });
      }
    }
  };

  const handleFollow = async (authorId: string) => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }
    try {
      await handlePrivateRequest("post", `/profiles/${authorId}/follow/`);

      const existingPollData: PollData[] = [...data];

      const newData = existingPollData.map((poll) => {
        if (poll.author_info.id === authorId) {
          poll.author_info.is_following = true;
        }
        return poll;
      });
      setData && setData(newData);
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

  const toggleShowAllOptions = (pollId: number) => {
    setShowAllOptions((prevShowAllOptions) => ({
      ...prevShowAllOptions,
      [pollId]: !prevShowAllOptions[pollId],
    }));
    setIsAddOptionsModalVisible(true);

    const selectedPollArray: any = [
      originalPollData.find((poll: any) => poll.id === pollId),
    ].filter(Boolean);
    if (selectedPollArray.length > 0) {
      const selectedPoll: any = selectedPollArray;
      setGetOptions(selectedPoll);
    }
  };

  const handleAddOptionsOk = () => {
    setIsAddOptionsModalVisible(false);
  };

  const handleAddOptionsCancel = () => {
    setIsAddOptionsModalVisible(false);
  };

  const toggleShowFullText = (id: number) => {
    setShowFullText((prevShowFullText) => ({
      ...prevShowFullText,
      [id]: !prevShowFullText[id],
    }));
  };

  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());
  const [votedChoices, setVotedChoices] = useState<Set<number>>(new Set());

  const handleUnvote = async (pollId: number, optionIndex: number) => {
    try {
      // Call unVote function
      await unVote(pollId.toString());

      // Decrement the vote count for the chosen option only if it's greater than 0
      const updatedData = data.map((poll) => {
        if (poll.id === pollId) {
          const newPoll = { ...poll };
          const voteCount = newPoll.choices[optionIndex].vote_count;
          if (voteCount > 0) {
            newPoll.choices[optionIndex].vote_count -= 1;
          }
          return newPoll;
        }
        return poll;
      });
      setOriginalPollData(updatedData);

      // Remove the poll ID from the votedPolls set and update local storage
      setVotedPolls((prevVotedPolls) => {
        const updatedVotedPolls = new Set(prevVotedPolls);
        updatedVotedPolls.delete(pollId);
        localStorage.setItem(
          "votedPolls",
          JSON.stringify(Array.from(updatedVotedPolls))
        );
        return updatedVotedPolls;
      });

      // Set showUndo to false for the corresponding poll
      setShowUndo((prevShowUndo) => {
        const updatedShowUndo = { ...prevShowUndo };
        delete updatedShowUndo[pollId];
        return updatedShowUndo;
      });
    } catch (error) {
      console.error("Failed to unvote:", error);
    }
  };

  useEffect(() => {
    const savedVotedPolls = localStorage.getItem("votedPolls");
    if (savedVotedPolls) {
      setVotedPolls(new Set(JSON.parse(savedVotedPolls)));
    }
  }, []);

  // Update local storage whenever votedPolls changes
  useEffect(() => {
    localStorage.setItem("votedPolls", JSON.stringify(Array.from(votedPolls)));
  }, [votedPolls]);
  useEffect(() => {
    const savedVotedChoices = localStorage.getItem("votedChoices");
    if (savedVotedChoices) {
      setVotedChoices(new Set(JSON.parse(savedVotedChoices)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "votedChoices",
      JSON.stringify(Array.from(votedChoices))
    );
  }, [votedChoices]);

  const handleVoteClick = async (pollId: number, choiceIndex: number) => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    } else {
      setShowUndo((prevState) => ({
        ...prevState,
        [pollId]: true,
      }));
      if (votedPolls.has(pollId)) {
        return;
      }
      const poll = data.find((p) => p.id === pollId);
      if (!poll) return; // Poll not found

      // Optimistically update UI
      const newVoteCount = poll.choices[choiceIndex].vote_count + 1;
      // console.log("vote count,", newVoteCount);
      poll.choices[choiceIndex].vote_count = newVoteCount;
      setVotedPolls((prev) => new Set(prev).add(pollId));
      setVotedChoices((prev) =>
        new Set(prev).add(poll.choices[choiceIndex].id)
      );

      try {
        await vote(pollId.toString(), poll.choices[choiceIndex].id);
        setShowUndo((prevState) => ({
          ...prevState,
          [pollId]: true,
        }));
        // console.log("testing theerror", error);
        if (error) {
          poll.choices[choiceIndex].vote_count = newVoteCount - 1;
          setVotedPolls((prev) => {
            const updated = new Set(prev);
            updated.delete(pollId);
            return updated;
          });
          console.log("error count ", newVoteCount);
        }
        // console.log("vote count good", newVoteCount);
        // Vote successful, state already updated optimistically
      } catch (error) {
        // Revert optimistic update on error

        console.error("Failed to vote:", error);
      }
    }
  };

  // SSort voted polss
  const getSortedChoices = (choices: any) => {
    return [...choices].sort((a, b) => b.vote_count - a.vote_count);
  };

  const getTotalVotes = (options: Choice[]) => {
    return options.reduce((total, option) => total + option.vote_count, 0);
  };

  const handleOptionClick = (pollId: number, optionIndex: number) => {
    setActiveOption((prevActive) =>
      prevActive?.pollId === pollId && prevActive.optionIndex === optionIndex
        ? null
        : { pollId, optionIndex }
    );
  };

  const [mediaOpen, setMediaOpen] = useState<Record<number, boolean>>({});
  const [mediaVisible, setMediaVisible] = useState(false);
  const [activeMedia, setActiveMedia] = useState<{
    pollId: number;
    optionIndex: number;
  } | null>(null);

  const [imageOpen, setImageOpen] = useState(false);
  const opts: YouTubeProps["opts"] = {
    height: "290",
    width: "300",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const [videoUrlId, setVideoUrlId] = useState<string | null>(null);

  const [mediaUrl, setMediaUrl] = useState("");
  const handleOpenMedia = (
    mediaUrl: string,
    choiceId: number,
    pollId: number,
    optionIndex: number
  ) => {
    let urlToOpen = mediaUrl; // By default, use the provided mediaUrl

    const selectedChoice = data.find((poll) =>
      poll.choices.some((choice) => choice.id === choiceId)
    );

    if (selectedChoice) {
      const choice = selectedChoice.choices.find(
        (choice) => choice.id === choiceId
      );
      if (choice) {
        urlToOpen = choice.choice_icon_url;
      }
    }

    const extension = urlToOpen.split(".").pop()?.toLowerCase();
    const extractVideoId = (url: string) => {
      const match = url.match(
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
      );
      return match && match[1];
    };

    // Set the extracted video ID to state
    const videoId = extractVideoId(mediaUrl);
    setVideoUrlId(videoId);

    // Log the mediaUrl only once when the component mounts
    console.log("mediaUrl:", videoId);
    // Check if the URL is a YouTube link
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = urlToOpen.match(youtubeRegex);
    if (match) {
      // Extract the YouTube video ID from the URL
      const videoId = match[4];
      // Generate the embed URL
      urlToOpen = `https://www.youtube.com/embed/${videoId}`;
    }

    // Render image or YouTube video
    setMediaUrl(urlToOpen);
    setActiveMedia({ pollId, optionIndex });
    setImageOpen(true);
    // const selectedChoice: any = [
    //   data.find(
    //     (poll: any) => poll.choices.map((id: any) => id.id) === choiceId
    //   ),
    // ].filter(Boolean);
    // if (selectedChoice.length > 0) {
    //   const selectedchoi: any = selectedChoice;
    //   console.log("selected", selectedchoi)
    // }
    // setImageOpen(!imageOpen);
  };
  const handleCloseModal = () => {
    setActiveMedia(null);
  };

  // share and option modal
  // const [shareModal, setShareModal] = useState<number | null>(null);

  // const handleShareToggle = (pollId: number) => {
  //   setShareModal(pollId);
  // };

  // const closeShareToggle = () => {
  //   setShareModal(null);
  // };

  const getTimeLeft = (deadline: any) => {
    if (deadline) {
      const now = moment();
      const end = moment(deadline);
      const duration = moment.duration(end.diff(now));

      const days = duration.days();
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);

      if (months > 0) {
        return `${months} ${months === 1 ? "month" : "months"} left`;
      } else if (weeks > 0) {
        return `${weeks} ${weeks === 1 ? "week" : "weeks"} left`;
      } else {
        return `${days} ${days === 1 ? "day" : "days"} left`;
      }
    } else {
      return "No Deadline";
    }
  };
  const router = useRouter();

  const handlePollClick = (data: any) => {
    router.push(`/${data.slug}`);
  };
  const loadingCircle = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress style={{ fontSize: "20px", color: "#ff4105" }} />
      </div>
    );
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.createWrap}></div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={loadingCircle()}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data.map((poll) => (
          <div className={styles.pollList} key={poll.id}>
            <div className={styles.pollWrapH}>
              <div className={styles.pollWrap}>
                <Link href={`/profile/${poll.author_info.username}`}>
                  {}
                  <Image
                    src={
                      poll.author_info.profile_picture ||
                      "http://res.cloudinary.com/dfduoxw3q/image/upload/v1709907853/upkqv7dw43pdtabyd3ga.webp"
                    }
                    className={styles.HeadImage}
                    width={30}
                    height={30}
                    alt=""
                  />
                </Link>
                <div className={styles.nameDes}>
                  <div className={styles.nameFollow}>
                    <Link href={`/profile/${poll.author_info.username}`}>
                      <span className={styles.userName}>
                        {poll.author_info.username}
                      </span>
                    </Link>
                    <span className={styles.ddott}>.</span>
                    <span className={styles.timeName}>
                      {moment(poll.created_at).fromNow()}
                    </span>
                    {!poll.author_info.is_following && (
                      <>
                        <span className={styles.ddott}>.</span>
                        <button
                          onClick={() => handleFollow(poll.author_info.id)}
                        >
                          Follow
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.pollWrapCon}>
              <div>
                <div className={styles.pollQuesion}>
                  <div
                    className={styles.textContent}
                    dangerouslySetInnerHTML={{ __html: poll.question }}
                    onClick={() => handlePollClick(poll)}
                  ></div>
                  {poll.is_legacy ? <Image src={Crown} alt="" /> : null}
                </div>

                <div className={styles.textContentWithButton}>
                  <div className={styles.hotLink}>
                    <span className={styles.textContentDescription}>
                      {showFullText[poll.id] ||
                      poll?.content.split(" ").length <= 50 ? (
                        <div
                          className={styles.content}
                          dangerouslySetInnerHTML={{ __html: poll?.content }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${poll?.content
                              .split(" ")
                              .slice(0, 50)
                              .join(" ")}...`,
                          }}
                        />
                      )}
                    </span>
                  </div>
                  {poll?.content?.split(" ").length > 50 && (
                    <span
                      onClick={() => toggleShowFullText(poll.id)}
                      className={styles.moreButton}
                    >
                      {showFullText[poll.id] ? "Less" : "More"}
                    </span>
                  )}
                </div>

                <div className={styles.optionsWrap}>
                  {(poll.display_result || votedPolls.has(poll.id)
                    ? getSortedChoices(poll.choices)
                    : poll.choices
                  )
                    // .slice(0, 4)
                    .map((choice, index) => {
                      return (
                        <div key={choice.id} className={styles.option}>
                          <div className={styles.optionWithImage}>
                            <Button
                              className={styles.optionsOutsidePic}
                              onClick={() =>
                                handleOpenMedia(
                                  choice.choice_icon_url,
                                  choice.id,
                                  poll.id,
                                  index
                                )
                              }
                            >
                              <Image
                                src={
                                  choice?.choice_icon_thumbnail ||
                                  "http://res.cloudinary.com/dfduoxw3q/image/upload/v1709907853/upkqv7dw43pdtabyd3ga.webp"
                                }
                                className={styles.HeadImage}
                                width={30}
                                height={30}
                                alt=""
                              />
                            </Button>
                            {activeMedia?.pollId === poll.id &&
                              activeMedia?.optionIndex === index && (
                                <div
                                  className={styles.dataOptionImage}
                                  onClick={() => handleCloseModal()}
                                >
                                  {mediaUrl.startsWith(
                                    "https://www.youtube.com"
                                  ) && videoUrlId ? (
                                    <YouTube videoId={videoUrlId} opts={opts} />
                                  ) : mediaUrl.endsWith(".mp4") ||
                                    mediaUrl.endsWith(".mkv") ? (
                                    // Video player
                                    <video controls>
                                      <source src={mediaUrl} />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : mediaUrl.endsWith(".mp3") ? (
                                    // Audio player
                                    <audio controls>
                                      <source src={mediaUrl} type="audio/mp3" />
                                      Your browser does not support the audio
                                      tag.
                                    </audio>
                                  ) : (
                                  
                                      <Image
                                        src={mediaUrl || ""}
                                        width={40}
                                        height={40}
                                        alt="Media"
                                      />
                               
                                  )}
                                </div>
                              )}
                            {poll.display_result || votedPolls.has(poll.id) ? (
                              <Button className={`${styles.options} `}>
                                <ProgressBar
                                  percentage={
                                    (choice.vote_count /
                                      getTotalVotes(poll.choices)) *
                                    100
                                  }
                                  optionName={choice.choice_text}
                                  voteCount={choice.vote_count}
                                  selectedVote={choice.selected_choice}
                                  votedChoice={votedChoices}
                                  pollId={choice.id}
                                />
                              </Button>
                            ) : (
                              <Button
                                className={`${
                                  poll.can_vote[0]
                                    ? styles.options
                                    : styles.optionsCan_Vote
                                }`}
                                onClick={() => handleVoteClick(poll.id, index)}
                                disabled={!poll.can_vote[0]}
                                title={poll.can_vote[1]}
                              >
                                {choice.choice_text.length > 30
                                  ? `${choice.choice_text.substring(0, 30)}...`
                                  : choice.choice_text}
                              </Button>
                            )}

                            <Button
                              className={styles.optionsOutside}
                              onClick={() => handleOptionClick(poll.id, index)}
                            >
                              <Image
                                src={DescriptionIcon}
                                className={styles.DescriptionIcon}
                                width={30}
                                height={30}
                                alt=""
                              />
                            </Button>
                          </div>

                          <div>
                            {activeOption?.pollId === poll.id &&
                              activeOption?.optionIndex === index && (
                                <div>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: choice?.content,
                                    }}
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className={styles.viewMore}>
                <p
                  className={`${
                    poll.choices.length <= 4
                      ? styles.disabledViewMore
                      : styles.viewMoreP
                  }`}
                  onClick={() => {
                    if (poll.choices.length > 4) {
                      toggleShowAllOptions(poll.id);
                    }
                  }}
                >
                  View All ({poll.choices.length})
                </p>
                {showAllOptions[poll.id] && (
                  <AddOptions
                    isModalVisible={isAddOptionsModalVisible}
                    handleOk={handleAddOptionsOk}
                    handleCancel={handleAddOptionsCancel}
                    options={getOptions}
                    handleVoteClick={handleVoteClick}
                    handleUnvote={handleUnvote}
                    votedPolls={votedPolls}
                    votedChoice={votedChoices}
                    activeOption={activeOption}
                    handleOptionClick={handleOptionClick}
                    getTotalVotes={getTotalVotes}
                    showUndo={showUndo}
                    getTimeLeft={getTimeLeft}
                  />
                )}
                <span>|</span>
                <p className={styles.viewMorePOA}>Add Opinion</p>
                <span>|</span>
                <span className={styles.viewMorePNO}>
                  {getTimeLeft(poll.deadline)}
                </span>
                <span className={styles.goDot}>
                  <GoDotFill color="#777777" />
                </span>

                <div className={styles.undoVotes}>
                  <span className={styles.viewMorePNO}>
                    {getTotalVotes(poll.choices)} votes
                  </span>
                </div>
                {showUndo[poll.id] || poll.display_result ? (
                  <>
                    <span>
                      <GoDotFill className={styles.goDot} color="#777777" />
                    </span>
                    <div className={styles.undoVotes}>
                      <button onClick={() => handleUnvote(poll.id, 1)}>
                        Undo
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className={styles.lcs}>
                {/* <Link href={`/home/${poll.slug}`} className={styles.hotLink}>
                  <p title="comment">
                    <FaRegComment size={18} />
                    {abbreviateNumber(poll.comments_count, 2)}
                  </p>
                </Link> */}
                <button
                  title="Monitor"
                  onClick={() => handleBookmark(poll.id, poll.slug)}
                >
                  <TiBookmark
                    size={18}
                    className={poll.is_monitored ? styles.activeIcon : ""}
                  />
                  {abbreviateNumber(poll.monitors_count, 2)}
                </button>
                <p title="Views">
                  <LiaStreetViewSolid size={24} />
                  {abbreviateNumber(poll.views, 2)}
                </p>

                <div className={styles.shareBox} tabIndex={0}>
                  <button title="Share">
                    <FaRegShareFromSquare size={18} />
                  </button>
                  <div className={styles.sharePopup}>
                    <button onClick={(e) => handleCopyLink(e, poll.slug)}>
                      Copy link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PollsList;
