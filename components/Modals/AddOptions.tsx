import React, { useState } from "react";
import styles from "@/styles/AddOption.module.css";
import { Modal, Button } from "antd";
import DescriptionIcon from "@/public/asset/svg/decscrip.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import dummy from "@/public/asset/image/dummy.webp";
import Image from "next/image";

const AddOptions = ({
  handleOptionClick,
  activeOption,
  isModalVisible,
  handleOk,
  handleCancel,
  options,
  handleVoteClick,
  handleUnvote,
  votedPolls,
  votedChoice,
  getTotalVotes,
  showUndo,
  getTimeLeft,
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options
    ? options?.map((poll: any) => ({
        ...poll,
        options: poll?.options?.filter((option: any) =>
          option?.choice_text?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
    : [];

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={40} height={40} />;
  };

  const [imageOpen, setImageOpen] = useState(false);

  const [mediaUrl, setMediaUrl] = useState("");
  const handleOpenMedia = (mediaUrl: string) => {
    let urlToOpen = mediaUrl; // By default, use the provided mediaUrl

    // Check if the choice icon URL is the default icon
    // if (mediaUrl === "/default-icon.png") {
    //   // If it is the default icon, use the dummy image
    //   urlToOpen = dummy;
    // }

    const extension = urlToOpen.split(".").pop()?.toLowerCase(); // Extract file extension

    if (extension === "mp4" || extension === "mkv") {
      // Render video player for .mp4 and .mkv files
      setMediaUrl(urlToOpen);
      setImageOpen(!imageOpen);
    } else if (extension === "mp3") {
      // Render audio player for .mp3 files
      setMediaUrl(urlToOpen);
      setImageOpen(!imageOpen);
    } else {
      // Render image for all other file types
      setMediaUrl(urlToOpen);
      setImageOpen(!imageOpen);
    }
  };

  return (
    <div className={styles.modal}>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles.modalContent}
      >
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredOptions?.map((poll: any) => (
          <div key={poll.id} className={styles.optionsWrap}>
            {poll?.choices.map((option: any, index: number) => {
              return (
                <div key={index} className={styles.option}>
                  <div className={styles.optionWithImage}>
                    {imageOpen && (
                      <div
                        className={styles.dataOptionImage}
                        onClick={() => handleOpenMedia("")}
                      >
                        {mediaUrl.endsWith(".mp4") ||
                        mediaUrl.endsWith(".mkv") ? (
                          // Video player
                          <video controls>
                            <source
                              src={mediaUrl || ""}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : mediaUrl.endsWith(".mp3") ? (
                          // Audio player
                          <audio controls>
                            <source
                              src={mediaUrl || ""}
                              type="audio/mp3"
                            />
                            Your browser does not support the audio tag.
                          </audio>
                        ) : (
                          <div>
                            <Image
                              src={mediaUrl || ""}
                              alt="Media"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    <Button
                      className={styles.optionsOutsidePic}
                      onClick={() => handleOpenMedia(option.choice_icon_url)}
                    >
                      <Image
                        src={
                          option.choice_icon_url === "/default-icon.png"
                            ? dummy
                            : option.choice_icon_url
                        }
                        className={styles.HeadImage}
                        alt=""
                      />
                    </Button>
                    {poll.display_result || votedPolls.has(poll.id) ? (
                      <Button
                        className={`${styles.options}`}
                        onClick={() => handleVoteClick(poll.id, index)}
                      >
                        <ProgressBar
                          percentage={
                            (option.vote_count / getTotalVotes(poll.choices)) *
                            100
                          }
                          optionName={option.choice_text}
                          voteCount={poll.vote_count}
                          selectedVote={option.selected_choice}
                          votedChoice={votedChoice}
                          pollId={poll.id}
                        />
                      </Button>
                    ) : (
                      <Button
                        className={styles.options}
                        onClick={() => handleVoteClick(poll.id, index)}
                      >
                        {/* {option.choice_text} */}
                        {option.choice_text.length > 30
                          ? `${option.choice_text.substring(0, 30)}...`
                          : option.choice_text}
                      </Button>
                    )}
                    <Button
                      className={styles.optionsOutside}
                      onClick={() => handleOptionClick(poll.id, index)}
                    >
                      <Image
                        src={DescriptionIcon}
                        className={styles.DescriptionIcon}
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
                              __html: option?.content,
                            }}
                          />
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
            {showUndo[poll.id] || poll.display_result ? (
              <div className={styles.undoVotes}>
                <button onClick={() => handleUnvote(poll.id, 1)}>Undo</button>
              </div>
            ) : null}
            <p className={styles.timeLikes}>
              {getTimeLeft(poll.deadline)} .{getTotalVotes(poll.choices)} votes
            </p>
            <div className={styles.adBtn}>Add New Options</div>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default AddOptions;
