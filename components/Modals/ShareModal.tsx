import React from "react";
import styles from "./modal.module.css";
import { IoIosShareAlt } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { CiBookmarkPlus } from "react-icons/ci";
import { RiErrorWarningLine } from "react-icons/ri";
import { LiaTimesSolid } from "react-icons/lia";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

const ShareModal = ({ closeShareToggle }: any) => {
  return (
    <div className={styles.shareModal} onClick={closeShareToggle}>
      <p>
        <IoIosShareAlt />
        Share
      </p>
      <p>
        <IoStatsChart />
        Poll Analysis
      </p>
      <p>
        <CiBookmarkPlus />
        Watchlist
      </p>
      <p>
        <RiErrorWarningLine />
        Report
      </p>
      <p>
        <HiOutlineDotsCircleHorizontal />
        More of this
      </p>
      <p>
        <LiaTimesSolid />
        Remove this field
      </p>
    </div>
  );
};

export default ShareModal;
