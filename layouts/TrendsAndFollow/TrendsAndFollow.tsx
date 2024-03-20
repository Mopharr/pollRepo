import React from "react";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import Trends from "../../components/Trends/Trends";
import WhoToFollow from "../../components/WhoToFollow/WhoToFollow";
import styles from "../../styles/style.module.css";
import Policy from "../../components/Policy/Policy";

const TrendsAndFollow = () => {
  const { pathname } = useRouter();

  const isNotWatchList = pathname !== "/watchlist";
  return (
    <div className={styles.trendWrap}>
      <div className={styles.trendTrend}>
        {pathname !== "/trends" && isNotWatchList && <Trends />}
      </div>
      <div className={styles.trendWhoToFollow}>
        <WhoToFollow />
      </div>
      <div className={styles.trendWhoToFollow}>
        <Policy />
      </div>
    </div>
  );
};

export default TrendsAndFollow;
