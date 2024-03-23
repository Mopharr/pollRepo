/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Layout, Space, Button } from "antd";
import Logo from "@/public/asset/image/Prl02r.png";
import Search from "@/public/asset/svg/search.svg";
import Home from "@/public/asset/svg/Homr.svg";
import Down from "@/public/asset/svg/down.svg";
import Plus from "@/public/asset/svg/roundPlus.svg";
import Ads from "@/public/asset/svg/promotion.svg";
import styles from "./Header.module.css";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
// import { NavLink,  } from "react-router-dom"
import { useRouter } from "next/router";
import ProfileIcon from "@/public/asset/svg/profile.svg";
import QuestionIcon from "@/public/asset/svg/question.svg";
import TermsIcon from "@/public/asset/svg/terms.svg";
import LogoutIcon from "@/public/asset/svg/logout.svg";
import PollCreationModal from "../Modals/CreatePoll";
import PlaceholderProfile from "@/public/asset/image/PlaceholderProfile.jpg";
import { CustomSwitch } from "@/ui";
import useClickOutside from "@/hooks/useClickOutside";
import DropdownMenu from "./DropdownMenu";
import useIsClient from "@/hooks/useIsClient";

const AuthHeader: React.FC<{ onLoginClick: () => void }> = ({
  onLoginClick,
}) => {
  const isClient = useIsClient();

  const { Header } = Layout;
  const {
    userProfile,
    logoutUser,
    handleShowLoginModal,
    isAuthenticated,
    handleShowAuthModal,
  } = UserAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const { pathname } = useRouter();

  const isProfile = pathname.includes("profile");

  const handleAdvertise = () => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }
  };

  useClickOutside({
    elementRef: modalRef,
    setState: setShowDropdown,
    stateValue: showDropdown,
  });

  const BrandIcon: React.FC = () => (
    <Link href="/">
      <Image className={styles.brandIcon} src={Logo.src} alt="polls_ranking" />
    </Link>
  );

  const showModal = () => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isClient && (
        <Header className={styles.header}>
          <div className={styles.headerContainer}>
            <BrandIcon />

            <Link href="/" className={`${styles.home} ${styles.laptopNav}`}>
              <Image src={Home} className={styles.homeIcon} alt="" />
            </Link>

            <button
              className={`${styles.create} ${styles.laptopNav}`}
              onClick={showModal}
            >
              <Image src={Plus} className={styles.plus} alt="" />
              Create Poll
            </button>

            {!isProfile && (
              <div className={styles.inputWrapper}>
                <Image src={Search} className={styles.search} alt="" />

                <input className={styles.searchBar} placeholder="Search..." />
              </div>
            )}

            <button
              className={`${styles.ads} ${styles.laptopNav}`}
              onClick={handleAdvertise}
            >
              <Image src={Ads} alt="" />
              Advertise
            </button>

            <Space className={styles.loginSpace}>
              {!isAuthenticated && (
                <Button onClick={handleShowLoginModal} className={styles.login}>
                  Login
                </Button>
              )}

              <div
                className={styles.iconWrapper}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {isAuthenticated && (
                  <Image
                    src={
                      userProfile?.profile_photo_url === "/profile_default.png"
                        ? PlaceholderProfile
                        : userProfile?.profile_photo_url ?? ""
                    }
                    width={45}
                    height={45}
                    alt={`${userProfile?.username}'s profile`}
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",
                      borderRadius: "75px",
                    }}
                  />
                )}

                <Image src={Ads} alt="" />

                {showDropdown && <DropdownMenu />}
              </div>
            </Space>
          </div>

          {/* <PollCreationModal
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        /> */}
        </Header>
      )}
    </>
  );
};

export default AuthHeader;
