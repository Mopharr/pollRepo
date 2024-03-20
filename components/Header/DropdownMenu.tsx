import React, { useState, useRef } from "react";
import Image from "next/image";
import { Layout, Space, Button } from "antd";
import Logo from "@/asset/image/Prl02r.png";
import Search from "@/asset/svg/search.svg";
import Home from "@/asset/svg/Homr.svg";
import Down from "@/asset/svg/down.svg";
import Plus from "@/asset/svg/roundPlus.svg";
import Ads from "@/asset/svg/promotion.svg";
import styles from "./Header.module.css";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import { NavLink, useLocation } from "react-router-dom";
import ProfileIcon from "@/asset/svg/profile.svg";
import QuestionIcon from "@/asset/svg/question.svg";
import TermsIcon from "@/asset/svg/terms.svg";
import LogoutIcon from "@/asset/svg/logout.svg";
import PollCreationModal from "../Modals/CreatePoll";
import PlaceholderProfile from "@/asset/image/PlaceholderProfile.jpg";
import { CustomSwitch } from "@/ui";
import useClickOutside from "@/hooks/useClickOutside";

const  DropdownMenu = () => {
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

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={20} height={20} />;
  };


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
        <NavLink to="/profile/me" className={styles.dropdownMenuLinkClass}>
          <SvgIcon as={ProfileIcon} />
          <p>Profile</p>
        </NavLink>
        <NavLink to="/privacy" className={styles.dropdownMenuLinkClass}>
          <SvgIcon as={TermsIcon} />
          <p>Privacy Policy</p>
        </NavLink>
        <NavLink to="/about" className={styles.dropdownMenuLinkClass}>
          <SvgIcon as={QuestionIcon} />
          <p>About</p>
        </NavLink>
        <NavLink to="/tos" className={styles.dropdownMenuLinkClass}>
          <SvgIcon as={TermsIcon} />
          <p>Terms of Service</p>
        </NavLink>
        <button
          className={`${styles.dropdownMenuLinkClass} ${styles.authBtn}`}
          onClick={isAuthenticated ? logoutUser : handleShowLoginModal}
        >
          <SvgIcon as={LogoutIcon} />
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

export default DropdownMenu