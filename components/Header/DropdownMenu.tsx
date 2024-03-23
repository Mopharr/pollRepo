import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { UserAuth } from "@/context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import ProfileIcon from "@/public/asset/svg/profile.svg";
import QuestionIcon from "@/public/asset/svg/question.svg";
import TermsIcon from "@/public/asset/svg/terms.svg";
import LogoutIcon from "@/public/asset/svg/logout.svg";
import PollCreationModal from "../Modals/CreatePoll";
import PlaceholderProfile from "@/public/asset/image/PlaceholderProfile.jpg";
import { CustomSwitch } from "@/ui";
import useClickOutside from "@/hooks/useClickOutside";

const DropdownMenu = () => {
  const {
    userProfile,
    logoutUser,
    handleShowLoginModal,
    isAuthenticated,
    handleShowAuthModal,
  } = UserAuth();
  const [voteIsAnonymous, setVoteIsAnonymous] = useState(false);

  const toggleAnonymousVote = () => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }

    setVoteIsAnonymous((prev) => !prev);
  };
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.dropdownMenuWrap} ref={modalRef}>
      <div className={styles.dropdownMenuTop}>
        <p>Vote Anonymously</p>
        <CustomSwitch
          checked={voteIsAnonymous}
          onChange={toggleAnonymousVote}
        />
      </div>
      <div className={styles.dropdownMenuLink}>
        <Link href="/profile/me" className={styles.dropdownMenuLinkClass}>
          <Image src={ProfileIcon} alt={""} />
          <p>Profile</p>
        </Link>
        <Link href="/privacy" className={styles.dropdownMenuLinkClass}>
          <Image src={TermsIcon} alt={""} />
          <p>Privacy Policy</p>
        </Link>
        <Link href="/about" className={styles.dropdownMenuLinkClass}>
          <Image src={QuestionIcon} alt={""} />
          <p>About</p>
        </Link>
        <Link href="/tos" className={styles.dropdownMenuLinkClass}>
          <Image src={TermsIcon} alt={""} />
          <p>Terms of Service</p>
        </Link>
        <button
          className={`${styles.dropdownMenuLinkClass} ${styles.authBtn}`}
          onClick={isAuthenticated ? logoutUser : handleShowLoginModal}
        >
          <Image src={LogoutIcon} alt={""} />
          <p> {isAuthenticated ? "Log out" : "Log in"}</p>
        </button>
        <p className={styles.dropdownPollRank}>
          {" "}
          PollRank (c) 2023 All right reserved
        </p>
      </div>
    </div>
  );
};

export default DropdownMenu;
