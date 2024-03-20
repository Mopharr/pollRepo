import { useState } from "react";
import { NavLink } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";
import FilterIcon from "@/asset/svg/filterIcon.svg";
import WatchList from "@/asset/svg/watchList.svg";
import DownIcon from "@/asset/svg/down.svg";
import { IoHomeSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Switch } from "antd";
import { CiCirclePlus } from "react-icons/ci";
// import  Bell  from "@/asset/svg/bell.svg";
import Ads from "@/asset/svg/promotion.svg";
import { useFilter, FilterState } from "@/context/FilterContext";
import categoriesData from "@/data/topics.json";
import * as FontAwesomeIcons from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";

interface NavLinkProps {
  isActive: boolean;
}

type DropdownState = {
  [key: string]: boolean;
};

const AuthSideBar = () => {
  const router = useRouter();
  const { filters, setFilters } = useFilter();
  const [hoveredNavLink, setHoveredNavLink] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({});

  const { handleShowAuthModal, isAuthenticated } = UserAuth();

  const { updateSearchParams } = useFilter();

  const isWatchListPage = router.pathname === "/watchlist";
  const isTrendsPage = router.pathname === "/trends";
  const isNotificationPage = router.pathname === "/notification";
  const isDetailPage = router.pathname.includes("me/");

  const handleToggleFilter = (filterName: keyof FilterState) => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }

    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const closeFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleMouseEnter = (name: string) => {
    setHoveredNavLink(name);
  };

  const handleMouseLeave = () => {
    setHoveredNavLink(null);
  };

  const getNavLinkClass = ({ isActive }: NavLinkProps) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  const toggleDropdown = (navLink: string) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [navLink]: !prevState[navLink],
    }));
  };

  type IconName = keyof typeof FontAwesomeIcons;

  interface IconMapperProps {
    iconName: IconName;
  }

  const IconMapper: React.FC<IconMapperProps> = ({ iconName }) => {
    const IconComponent = FontAwesomeIcons[iconName];
    if (!IconComponent) return null;

    return <IconComponent />;
  };

  const handleCategorySelect = (category: any) => {
    setSelectedSubCategory(category);
    updateSearchParams({ interests: category });
  };

  const handleAuthCheck = () => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }
  };
  return (
    <>
      <div className={styles.sidebar1}>
        <Link
          href={isAuthenticated ? "home" : ""}
          className={`${getNavLinkClass} ${styles.mobileNav} ${
            router.pathname === "/home" ? styles.activeLink : ""
          }`}
          onMouseEnter={() => handleMouseEnter("home")}
          onMouseLeave={handleMouseLeave}
          onClick={handleAuthCheck}
        >
          <p
            className={getNavLinkClass({
              isActive: hoveredNavLink === "home",
            })}
          >
            <IoHomeSharp style={{ width: "25px", height: "25px" }} />
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Home</span>
            {hoveredNavLink === "home" && (
              <span className={styles.tooltip}>Home</span>
            )}
          </p>
        </Link>

        <Link
          href={isAuthenticated ? "explore" : ""}
          className={`${getNavLinkClass} ${styles.mobileNav} ${
            router.pathname === "/explore" ? styles.activeLink : ""
          }`}
          onMouseEnter={() => handleMouseEnter("explore")}
          onMouseLeave={handleMouseLeave}
          onClick={handleAuthCheck}
        >
          <p
            className={getNavLinkClass({
              isActive: hoveredNavLink === "explore",
            })}
          >
            <CiSearch style={{ width: "25px", height: "25px" }} />
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Explore</span>
            {hoveredNavLink === "explore" && (
              <span className={styles.tooltip}>Explore</span>
            )}
          </p>
        </Link>
        <div
          className={`${styles.dropdownHeader} ${getNavLinkClass}`}
          onClick={toggleFilterDropdown}
          onMouseEnter={() => handleMouseEnter("filter")}
          onMouseLeave={handleMouseLeave}
        >
          <p
            // className={styles.dropdownHeaderSpan}
            className={getNavLinkClass({
              isActive: hoveredNavLink === "filter",
            })}
          >
            <Image src={FilterIcon} className={styles.filterIcons} alt="" />
            <span className={styles.filterr}></span>

            <span style={{ fontSize: "20px", fontWeight: "700" }}>Filters</span>
            {hoveredNavLink === "filter" && (
              <span className={styles.tooltip}>Filter</span>
            )}
          </p>
          <Image src={DownIcon} className={styles.filterr} alt="" />
        </div>
        <div
          className={`${
            isFilterDropdownOpen
              ? styles.dropdownContent
              : styles.dropdownContents
          } `}
        >
          <div className={styles.dropDownWrap}>
            <LiaTimesSolid
              onClick={closeFilterDropdown}
              className={styles.filterCloseIcon}
            />
            <div className={styles.dropdownItem}>
              <span>Legacy Polls Only</span>
              <Switch
                checked={filters.legacyPollsOnly}
                onChange={() => handleToggleFilter("legacyPollsOnly")}
              />
            </div>
            <div className={styles.dropdownItem}>
              <span>Exclude Expired polls</span>
              <Switch
                checked={filters.excludeExpiredPolls}
                onChange={() => handleToggleFilter("excludeExpiredPolls")}
              />
            </div>
            <div className={styles.dropdownItem}>
              <span>Exclude Voted polls</span>
              <Switch
                checked={filters.excludeVotedPolls}
                onChange={() => handleToggleFilter("excludeVotedPolls")}
              />
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <Link
            href="/watchlist"
            className={`${getNavLinkClass}  ${
              router.pathname === "/watchlist" ? styles.activeLink : ""
            }`}
            onMouseEnter={() => handleMouseEnter("watchlist")}
            onMouseLeave={handleMouseLeave}
          >
            <p
              className={getNavLinkClass({
                isActive: hoveredNavLink === "watchlist",
              })}
            >
              <Image
                src={WatchList}
                style={{ width: "25px", height: "25px" }}
                alt=""
              />
              <span style={{ fontSize: "21px", fontWeight: "600" }}>
                Watchlist
              </span>
              {hoveredNavLink === "watchlist" && (
                <span className={styles.tooltip}>Watchlist</span>
              )}
            </p>
          </Link>
        )}

        {/* {isAuthenticated && (
           <Link
           href="notification"
            className={`${getNavLinkClass} ${styles.mobileNav}${
              router.pathname === "/notification" ? styles.activeLink : ""
            } `}
            onMouseEnter={() => handleMouseEnter("notification")}
            onMouseLeave={handleMouseLeave}
          >
            <p
              className={getNavLinkClass({
                isActive: hoveredNavLink === "notification",
              })}
            >
              <Image as={Bell} style={{ width: "25px", height: "25px" }} alt=""/>
              <span style={{ fontSize: "20px", fontWeight: "700" }}>
                Notification
              </span>
              {hoveredNavLink === "notification" && (
                <span className={styles.tooltip}>Notification</span>
              )}
            </p>
          </Link>
        )} */}

        {isAuthenticated && (
          <Link
            href="advertise"
            className={`${getNavLinkClass} ${styles.mobileNav} ${
              router.pathname === "/advertise" ? styles.activeLink : ""
            } `}
            onMouseEnter={() => handleMouseEnter("advertise")}
            onMouseLeave={handleMouseLeave}
          >
            <p
              className={getNavLinkClass({
                isActive: hoveredNavLink === "advertise",
              })}
            >
              <Image
                src={Ads}
                style={{ width: "25px", height: "25px" }}
                alt=""
              />
              <span style={{ fontSize: "20px", fontWeight: "700" }}>
                Advertise
              </span>
              {hoveredNavLink === "advertise" && (
                <span className={styles.tooltip}>advertise</span>
              )}
            </p>
          </Link>
        )}

        <div
          className={`${getNavLinkClass} ${styles.mobileNav}`}
          onMouseEnter={() => handleMouseEnter("create")}
          onMouseLeave={handleMouseLeave}
          // onClick={handleAuthCheck}
        >
          <p
            className={getNavLinkClass({
              isActive: hoveredNavLink === "create",
            })}
          >
            <Image
              src={CiCirclePlus}
              style={{ width: "25px", height: "25px" }}
              alt=""
            />

            <span style={{ fontSize: "20px", fontWeight: "700" }}>
              Create Polls
            </span>
            {hoveredNavLink === "create" && (
              <span className={styles.tooltip}>Creat Polls</span>
            )}
          </p>
        </div>
      </div>

      {!isWatchListPage &&
        !isTrendsPage &&
        !isNotificationPage &&
        !isDetailPage && (
          <div className={styles.sidebar}>
            <p className={styles.topic}>TOPICS</p>
            <div className={styles.sidebarScrollable}>
              {categoriesData.map((category, index) => (
                <div key={index}>
                  <div
                    className={styles.dropdownHeader}
                    onClick={() => toggleDropdown(category.category)}
                  >
                    <span className={styles.dropdownHeaderSpan}>
                      <IconMapper iconName={category.iconName as IconName} />
                      <span className={styles.categoryName}>
                        {category.category}
                      </span>
                    </span>

                    <div>
                      <Image src={DownIcon} alt="" />
                    </div>
                  </div>

                  {dropdownOpen[category.category] && (
                    <div className={styles.dropdownContent}>
                      {category["sub-categories"].map(
                        (subCategory, subIndex) => (
                          <p
                            key={subIndex}
                            onClick={() => handleCategorySelect(subCategory)}
                            className={`${styles.additionalClass} ${
                              subCategory === selectedSubCategory
                                ? styles.activeClass
                                : ""
                            }`}
                          >
                            {subCategory}
                          </p>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};

export default AuthSideBar;
