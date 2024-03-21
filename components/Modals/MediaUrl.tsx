import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../MainConent/styles.module.css";
import dummy from "../../asset/image/dummy.webp";
import Iframe from "react-iframe";
import YouTube, { YouTubeProps } from "react-youtube";
import Image from "next/image";



const MediaUrl = ({ mediaUrl, handleOpenMedia }: any) => {
  const [videoUrlId, setVideoUrlId] = useState<string | null>(null);

  useEffect(() => {
    // Extract the video ID when the component mounts
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

    // Since we only want this to run once, we don't add any dependencies to useEffect
  }, []);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "290",
    width: "300",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className={styles.modal}>
      <div
        className={styles.dataOptionImage}
        onClick={() => handleOpenMedia("")}
      >
        {mediaUrl.startsWith("https://www.youtube.com") && videoUrlId ? (
          <YouTube videoId={videoUrlId} opts={opts} />
        ) : mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".mkv") ? (
          // Video player
          <video controls>
            <source src={mediaUrl ? mediaUrl : dummy} />
            Your browser does not support the video tag.
          </video>
        ) : mediaUrl.endsWith(".mp3") ? (
          // Audio player
          <audio controls>
            <source src={mediaUrl ? mediaUrl : dummy} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
        ) : (
          <div>
           {/* <Image src={mediaUrl ? mediaUrl : dummy} alt="Media" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUrl;
