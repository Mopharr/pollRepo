import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Trends.module.css";
import DownIcon from "../../asset/svg/down.svg";
import Threedot from "../../asset/svg/three_dot.svg";
import Loading from "../../asset/svg/LoadingIcon.svg";
import Onedot from "../../asset/svg/one_dot.svg";
import { formatNumber } from "../../helpers";
import { CiSearch } from "react-icons/ci";
import { useFilterTrendingPolls } from "../../context/TrendingPollsContext";
import { countries } from "../../constants/countries";
import useClickOutside from "../../hooks/useClickOutside";

const Trends = () => {
  const { data, setCountryCode } = useFilterTrendingPolls();

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("country") || "World Wide"
      : "World Wide"
  );
  const [countrySearchValue, setCountrySearchValue] = useState<string>("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const displayData = router.pathname !== "/trends" ? data.slice(0, 5) : data;

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearchValue.toLowerCase())
  );

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={25} height={25} />;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCountrySelect = (country: string, code: string) => {
    localStorage.setItem("country", country);
    setSelectedCountry(country);
    localStorage.setItem("countryCode", code);
    setCountryCode(code);
    setCountrySearchValue("");
    setIsDropdownOpen(false);
  };

  useClickOutside({
    elementRef: modalRef,
    setState: setIsDropdownOpen,
    stateValue: isDropdownOpen,
  });

  return (
    <div className={styles.trendWrap} style={{ position: "relative" }}>
      <p className={styles.trendP}>Trending Polls</p>
      <div className={styles.trendNig} onClick={toggleDropdown}>
        <p>{selectedCountry}</p>
        <Image
          src={DownIcon}
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
          alt=""
        />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown} ref={modalRef}>
          <div className={styles.cover} />
          <div className={styles.searchBox}>
            <input
              type="text"
              name="country_search"
              id="country_search"
              placeholder="Search"
              value={countrySearchValue}
              onChange={(e) => setCountrySearchValue(e.target.value)}
            />
            <CiSearch size={18} />
          </div>
          {filteredCountries.map((country) => (
            <p
              key={country.id}
              className={styles.dropdownItem}
              onClick={() => handleCountrySelect(country.name, country.code)}
            >
              {country.name}
            </p>
          ))}
        </div>
      )}

      <div className={styles.trendBox}>
        {displayData.map((trend) => {
          const dateOnly = trend?.deadline?.split("T")[0];
          return (
            <Link
              href={`/${trend.slug}`}
              className={styles.trendContainer}
              key={trend.id}
            >
              <div className={styles.trendHead}>
                <p className={styles.trendName}>
                  {trend.interests.length > 0 ? trend.interests[0]?.name : ""}
                </p>
              </div>

              <p
                className={styles.trendMText}
                dangerouslySetInnerHTML={{ __html: trend.question }}
              ></p>
              <div className={styles.trendBottom}>
                <p>{formatNumber(trend.votes_count)} voters</p>
                <p>
                  <Image src={Onedot} alt="" />
                  {formatNumber(trend.recent_votes_count)} recent votes
                </p>
                <p style={{ marginLeft: "0.4rem" }}>
                  <Image src={Loading} className={styles.loading} alt="" />
                  <span style={{ marginLeft: "0.4rem" }}>
                    {dateOnly ? dateOnly : "No deadline"}
                  </span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => router.push("/trends")}
        className={styles.showMore}
      >
        Show more
      </button>
    </div>
  );
};

export default Trends;
