import React, { useState, useRef } from "react";
import { Layout, Space, Button } from "antd";
import Logo from "../../asset/image/Prl02r.png";
import { ReactComponent as Search } from "../../asset/svg/search.svg";
import { ReactComponent as Home } from "../../asset/svg/Homr.svg";
import { ReactComponent as Down } from "../../asset/svg/down.svg";
// import { ReactComponent as Bell } from "../../asset/svg/bell.svg";
import { ReactComponent as Plus } from "../../asset/svg/roundPlus.svg";
import { ReactComponent as Ads } from "../../asset/svg/promotion.svg";
import styles from "./Header.module.css";
import { UserAuth } from "../../context/AuthContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../../asset/svg/profile.svg";
import { ReactComponent as QuestionIcon } from "../../asset/svg/question.svg";
import { ReactComponent as TermsIcon } from "../../asset/svg/terms.svg";
import { ReactComponent as LogoutIcon } from "../../asset/svg/logout.svg";
import PollCreationModal from "../Modals/CreatePoll";
import PlaceholderProfile from "../../asset/image/PlaceholderProfile.jpg";
import { CustomSwitch } from "../../ui";
import useClickOutside from "../../hooks/useClickOutside";

const AuthHeader: React.FC<{ onLoginClick: () => void }> = ({
  onLoginClick,
}) => {
  const { Header } = Layout;
  const {
    userProfile,
    logoutUser,
    handleShowLoginModal,
    isAuthenticated,
    handleShowAuthModal,
  } = UserAuth();
  const [voteIsAnonymous, setVoteIsAnonymous] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={20} height={20} />;
  };

  const isProfile = pathname.includes("profile");

  const toggleAnonymousVote = () => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }

    setVoteIsAnonymous((prev) => !prev);
  };

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

  const DropdownMenu = () => {
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

  const BrandIcon: React.FC = () => (
    <Link to="/home">
      <img className={styles.brandIcon} src={Logo} alt="polls_ranking" />
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
    <Header className={styles.header}>
      <div className={styles.headerContainer}>
        <BrandIcon />

        <NavLink to="/" className={`${styles.home} ${styles.laptopNav}`}>
          <SvgIcon as={Home} className={styles.homeIcon} />
        </NavLink>

        <button
          className={`${styles.create} ${styles.laptopNav}`}
          onClick={showModal}
        >
          <SvgIcon as={Plus} className={styles.plus} />
          Create Poll
        </button>

        {!isProfile && (
          <div className={styles.inputWrapper}>
            <SvgIcon as={Search} className={styles.search} />
            <input className={styles.searchBar} placeholder="Search..." />
          </div>
        )}

        {/* {isAuthenticated && (
          <NavLink
            to="/notification"
            className={`${styles.bells} ${styles.laptopNav}`}
          >
            <SvgIcon as={Bell} className={styles.bellsIcon} />
          </NavLink>
        )} */}

        <button
          className={`${styles.ads} ${styles.laptopNav}`}
          onClick={handleAdvertise}
        >
          <SvgIcon as={Ads} />
          Advertise
        </button>

        <Space className={styles.loginSpace}>
          {!isAuthenticated && (
            <Button onClick={onLoginClick} className={styles.login}>
              Login
            </Button>
          )}

          <div
            className={styles.iconWrapper}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {isAuthenticated && (
              <img
                src={
                  userProfile?.profile_photo_url
                    ? userProfile.profile_photo_url
                    : PlaceholderProfile
                }
                alt={`${userProfile?.username}'s profile`}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "cover",
                  borderRadius: "75px",
                }}
              />
            )}

            <SvgIcon as={Down} />

            {showDropdown && <DropdownMenu />}
          </div>
        </Space>
      </div>

      <PollCreationModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Header>
  );
};

export default AuthHeader;
