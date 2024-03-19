import { useState, useEffect, MouseEvent } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import styles from "../components/MainConent/styles.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as ThreeDot } from "../asset/svg/three_dot.svg";
import { ReactComponent as DescriptionIcon } from "../asset/svg/decscrip.svg";
import { Button } from "antd";
import dummy from "../asset/image/dummy.webp";
import { GoDotFill } from "react-icons/go";
import { axiosPublic, axiosPrivate } from "../library/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useVote } from "../hooks/poll/useVote";
import { PollData, Choice } from "../types/fetchPolls.type";
import ShareModal from "../components/Modals/ShareModal";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import moment from "moment";
import { UserAuth } from "../context/AuthContext";
import Iframe from "react-iframe";
import { TiBookmark } from "react-icons/ti";
import { LiaStreetViewSolid } from "react-icons/lia";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { abbreviateNumber } from "js-abbreviation-number";
import { handlePrivateRequest } from "../utils/http";
import useNotify from "../hooks/useNotify";
import { Helmet } from "react-helmet-async";

type Props = {};

const PollDetails = (props: Props) => {
  // const { isAuthenticated } = UserAuth();
  const { sessionId, isAuthenticated, handleShowAuthModal } = UserAuth();
  const { slug } = useParams();
  console.log("testing slug", slug);
  const [poll, setPoll] = useState<PollData[]>([]);

  useAxiosPrivate();

  useEffect(() => {
    const fetchPollDetails = async () => {
      try {
        const response = isAuthenticated
          ? await axiosPrivate.get<any>(`/polls/${slug}`)
          : await axiosPublic.get<any>(`/polls/${slug}`);
        console.log("slug", response.data.Poll);
        setPoll(response.data.Poll.poll);
      } catch (error) {
        console.error("Error fetching poll details:", error);
      }
    };

    fetchPollDetails();
  }, [slug, isAuthenticated]);

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={40} height={40} />;
  };

  // share and option modal
  const [shareModal, setShareModal] = useState<number | null>(null);

  const handleShareToggle = (pollId: number) => {
    setShareModal(pollId);
  };

  const closeShareToggle = () => {
    setShareModal(null);
  };

  //  Show full and cut text

  const [showFullText, setShowFullText] = useState<Record<number, boolean>>({});

  const toggleShowFullText = (id: number) => {
    setShowFullText((prevShowFullText) => ({
      ...prevShowFullText,
      [id]: !prevShowFullText[id],
    }));
  };

  // options image
  const [imageOpen, setImageOpen] = useState(false);

  const [mediaUrl, setMediaUrl] = useState("");
  const handleOpenMedia = (mediaUrl: string) => {
    let urlToOpen = mediaUrl; // By default, use the provided mediaUrl

    // Check if the choice icon URL is the default icon
    if (mediaUrl === "/default-icon.png") {
      // If it is the default icon, use the dummy image
      urlToOpen = dummy;
    }

    const extension = urlToOpen.split(".").pop()?.toLowerCase();

    if (extension === "mp4" || extension === "mkv") {
      // Render video player for .mp4 and .mkv files
      setMediaUrl(urlToOpen);
      setImageOpen(!imageOpen);
    } else if (extension === "mp3") {
      // Render audio player for .mp3 files
      setMediaUrl(urlToOpen);
      setImageOpen(!imageOpen);
    } else {
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
      setImageOpen(!imageOpen);
    }
  };

  // Vote and unvote

  const [showUndo, setShowUndo] = useState<Record<number, boolean>>({});

  // const [isAddOptionsModalVisible, setIsAddOptionsModalVisible] =
  //   useState(false);

  const [activeOption, setActiveOption] = useState<{
    pollId: number;
    optionIndex: number;
  } | null>(null);
  const [showAllOptions, setShowAllOptions] = useState<Record<number, boolean>>(
    {}
  );
  const [getOptions, setGetOptions] = useState([]);
  const [originalPollData, setOriginalPollData] = useState<any[]>(poll);
  const [votedOptionId, setVotedOptionId] = useState(null);
  const { vote, unVote } = useVote();

  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());
  const [votedChoices, setVotedChoices] = useState<Set<number>>(new Set());

  const handleUnvote = async (pollId: number, optionIndex: number) => {
    try {
      // Call unVote function
      await unVote(pollId.toString());

      // Decrement the vote count for the chosen option
      const updatedData = poll.map((poll) => {
        if (poll.id === pollId) {
          const newPoll = { ...poll };
          newPoll.choices[optionIndex].vote_count -= 1;
          return newPoll;
        }
        return poll;
      });
      setOriginalPollData(updatedData);

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

  // Update local storage whenever votedPolls changes
  useEffect(() => {
    localStorage.setItem("votedPolls", JSON.stringify(Array.from(votedPolls)));
  }, [votedPolls]);

  const handleVoteClick = async (pollId: number, choiceIndex: number) => {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      console.log("you cannot vote");
    } else {
      setShowUndo((prevState) => ({
        ...prevState,
        [pollId]: true,
      }));
      if (votedPolls.has(pollId)) {
        return;
      }
      const polls = poll.find((p) => p.id === pollId);
      if (!polls) return; // Poll not found

      // Optimistically update UI
      const newVoteCount = polls.choices[choiceIndex].vote_count + 1;
      polls.choices[choiceIndex].vote_count = newVoteCount;
      setVotedPolls((prev) => new Set(prev).add(pollId));
      setVotedChoices((prev) =>
        new Set(prev).add(polls.choices[choiceIndex].id)
      );

      try {
        await vote(pollId.toString(), polls.choices[choiceIndex].id);
        setShowUndo((prevState) => ({
          ...prevState,
          [pollId]: true,
        }));
        // Vote successful, state already updated optimistically
      } catch (error) {
        // Revert optimistic update on error
        polls.choices[choiceIndex].vote_count = newVoteCount - 1;
        setVotedPolls((prev) => {
          const updated = new Set(prev);
          updated.delete(pollId);
          return updated;
        });
        console.error("Failed to vote:", error);
      }
    }
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
  // showall options
  // const toggleShowAllOptions = (pollId: number) => {
  //   setShowAllOptions((prevShowAllOptions) => ({
  //     ...prevShowAllOptions,
  //     [pollId]: !prevShowAllOptions[pollId],
  //   }));
  //   // setIsAddOptionsModalVisible(true);

  //   const selectedPollArray: any = [
  //     originalPollData.find((poll: any) => poll.id === pollId),
  //   ].filter(Boolean);
  //   if (selectedPollArray.length > 0) {
  //     const selectedPoll: any = selectedPollArray;
  //     setGetOptions(selectedPoll);
  //   }
  // };
  // const handleAddOptionsOk = () => {
  //   setIsAddOptionsModalVisible(false);
  // };

  // const handleAddOptionsCancel = () => {
  //   setIsAddOptionsModalVisible(false);
  // };

  // deadline

  // bookmark
  const handleBookmark = async (id: number, slug: string) => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }
    try {
      await handlePrivateRequest("post", `/monitors/toggle_monitor/${slug}/`);

      const existingPollData: PollData[] = [...poll];
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
      setPoll && setPoll(existingPollData);
    } catch (error: any) {
      // console.log(error?.response?.data);
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

  const notify = useNotify();
  const BASE_URL = "https://pollrepo.com";

  const handleCopyLink = (e: MouseEvent<HTMLButtonElement>, slug: string) => {
    navigator.clipboard.writeText(BASE_URL + `${slug}`).then(
      (success) => notify("copied to clipboard", "success"),
      (err) => notify("Error copying to clipboard", "error")
    );
    e.currentTarget.blur();
  };

  // meta description

  useEffect(() => {
    if (poll.length > 0) {
      const questions = poll.map((user) => user.question);
      const descriptions = poll.map((user) => user.content);
      const description = questions.join(", ");
      const additionalDescription = descriptions.join(", ");
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", `${description}. | ${additionalDescription}`);
    }
  }, [poll]);

  return (
    <>
      <Helmet>
        <title>Poll Details</title>
        <meta name="description" content="Polls Details" />
      </Helmet>
      <div>
        <div className={styles.title}>
          <HiArrowLeft className={styles.titleIcon} />
          <h2>Polls</h2>
        </div>
        {poll.map((poll) => {
          return (
            <div>
              <div
                style={{
                  borderBottom: "2px solid #CACACA",
                  margin: "0 auto",
                  width: "90%",
                }}
                key={poll.id}
              >
                <div className={styles.pollWrapH}>
                  <div className={styles.pollWrap}>
                    <img
                      src={poll.author_info.profile_picture}
                      className={styles.HeadImage}
                      alt=""
                    />
                    <div className={styles.nameDes}>
                      <div className={styles.nameFollow}>
                        <span className={styles.userName}>
                          {poll.author_info.username}
                        </span>
                        <span className={styles.ddott}>.</span>
                        <span className={styles.timeName}>
                          {moment(poll.created_at).fromNow()}
                        </span>
                        <span className={styles.ddott}>.</span>
                        <Link to="#">Follow</Link>
                      </div>
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <SvgIcon
                      as={ThreeDot}
                      className={styles.userName3}
                      onClick={() => handleShareToggle(poll.id)}
                    />

                    {shareModal === poll.id ? (
                      <ShareModal closeShareToggle={closeShareToggle} />
                    ) : null}
                  </div>
                </div>
                <div className={styles.pollWrapCon}>
                  <div>
                    <div
                      className={styles.textContent}
                      dangerouslySetInnerHTML={{ __html: poll?.question || "" }}
                    ></div>
                    <div className={styles.textContentWithButton}>
                      <span className={styles.textContentDescription}>
                        {showFullText[poll.id] ||
                        poll?.content.split(" ").length <= 25 ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: poll?.content || "",
                            }}
                          ></div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${poll?.content
                                .split(" ")
                                .slice(0, 25)
                                .join(" ")}...`,
                            }}
                          ></div>
                        )}
                      </span>
                      {poll?.content?.split(" ").length > 25 && (
                        <span
                          onClick={() => toggleShowFullText(poll.id)}
                          className={styles.moreButton}
                        >
                          {showFullText[poll.id] ? "Less" : "More"}
                        </span>
                      )}
                    </div>

                    <div className={styles.optionsWrap}>
                      {poll.choices.map((choice, index) => {
                        return (
                          <div className={styles.option}>
                            <div className={styles.optionWithImage}>
                              {imageOpen && (
                                <div
                                  className={styles.dataOptionImage}
                                  onClick={() => handleOpenMedia("")}
                                >
                                  {mediaUrl.startsWith(
                                    "https://www.youtube.com"
                                  ) ? (
                                    <>
                                      <Iframe
                                        width="420"
                                        height="315"
                                        url={mediaUrl}
                                        id=""
                                        className=""
                                        display="block"
                                        position="relative"
                                      />
                                    </>
                                  ) : mediaUrl.endsWith(".mp4") ||
                                    mediaUrl.endsWith(".mkv") ? (
                                    // Video player
                                    <video controls>
                                      <source
                                        src={mediaUrl ? mediaUrl : dummy}
                                        // type="vid
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : mediaUrl.endsWith(".mp3") ? (
                                    // Audio player
                                    <audio controls>
                                      <source
                                        src={mediaUrl ? mediaUrl : dummy}
                                        type="audio/mp3"
                                      />
                                      Your browser does not support the audio
                                      tag.
                                    </audio>
                                  ) : (
                                    <div>
                                      <img
                                        src={mediaUrl ? mediaUrl : dummy}
                                        alt="Media"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                              <Button
                                className={styles.optionsOutsidePic}
                                onClick={() =>
                                  handleOpenMedia(choice.choice_icon_url)
                                }
                              >
                                <img
                                  src={choice.choice_icon_thumbnail}
                                  className={styles.HeadImage}
                                  alt=""
                                />
                              </Button>
                              {poll.display_result ||
                              votedPolls.has(poll.id) ? (
                                <Button
                                  className={`${styles.options} `}
                                  onClick={() =>
                                    handleVoteClick(poll.id, index)
                                  }
                                >
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
                                  className={styles.options}
                                  onClick={() =>
                                    handleVoteClick(poll.id, index)
                                  }
                                >
                                  {choice.choice_text.length > 20
                                    ? `${choice.choice_text.substring(
                                        0,
                                        20
                                      )}...`
                                    : choice.choice_text}
                                </Button>
                              )}

                              <Button
                                className={styles.optionsOutside}
                                onClick={() =>
                                  handleOptionClick(poll.id, index)
                                }
                              >
                                <SvgIcon
                                  as={DescriptionIcon}
                                  className={styles.DescriptionIcon}
                                />
                              </Button>
                            </div>

                            <div>
                              {activeOption?.pollId === poll.id &&
                                activeOption?.optionIndex === index && (
                                  <div>
                                    <p
                                      dangerouslySetInnerHTML={
                                        {
                                          __html: choice?.content,
                                        } || ""
                                      }
                                    ></p>
                                  </div>
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.viewMore}>
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
                    {/* <Link to={`/home/${poll.slug}`} className={styles.hotLink}>
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PollDetails;
function notify(arg0: string, arg1: string, arg2: { toastId: any }) {
  throw new Error("Function not implemented.");
}