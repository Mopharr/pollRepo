import React, { useEffect, useState } from "react";
import styles from "./whoToFollow.module.css";
import { Button } from "antd";
import { shuffleArray } from "../../helpers";
import data from "../../data/data";
import TopicsToFollow from "../TopicsToFollow/TopicsToFollow";
import { UserAuth } from "../../context/AuthContext";
import Image from "next/image";

type DataType = {
  userName: string;
  hours: number;
  mainText: string;
  trendName: string;
  id: number;
  image: string;
};

const WhoToFollow = () => {
  const [shuffledData, setShuffledData] = useState<DataType[]>([]);
  const [showAll, setShowAll] = useState(false);
  const { isAuthenticated, handleShowAuthModal } = UserAuth();

  const displayedData = showAll ? shuffledData : shuffledData.slice(0, 5);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleFollow = () => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }
  };

  return (
    <div className={styles.wtfWrap}>
      <p className={styles.wtfHead}>Who to follow</p>
      {data.slice(0, 5).map((whotofollow) => (
        <div className={styles.wtf} key={whotofollow.id}>
          <div className={styles.wtfRight}>
            <Image src={whotofollow.image} alt="" />
            <div>
              <p className={styles.wtfRightUser}>{whotofollow.userName}</p>
              <p className={styles.wtfRightUserLight}>
                @{whotofollow.userName}
              </p>
            </div>
          </div>
          <Button onClick={handleFollow} className={styles.followBtn}>
            Follow
          </Button>
        </div>
      ))}
      <button onClick={toggleShowAll} className={styles.showMore}>
       show more
      </button>

      {isAuthenticated && <TopicsToFollow />}
    </div>
  );
};

export default WhoToFollow;
