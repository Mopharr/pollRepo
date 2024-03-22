import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/explore.module.css";
import Trends from "../components/Trends/Trends";
import Loading from "@/asset/svg/LoadingIcon.svg";
import Search from "@/asset/svg/search.svg";
import Onedot from "@/asset/svg/one_dot.svg";
import TopicsToFollow from "@/components/TopicsToFollow/TopicsToFollow";
import { useFilterTrendingPolls } from "@/context/TrendingPollsContext";
import { formatNumber } from "@/helpers";
import PollsList from "@/components/PollsList/PollsList";
import Image from "next/image";

const Explore = () => {
  const { data, setCountryCode } = useFilterTrendingPolls();
  const navigate = useNavigate();

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={20} height={20} />;
  };

  return (
    <div className={styles.explarePages}>
      <div className={styles.inputWrapper}>
        <Image src={Search} className={styles.search} alt="" />
        <input className={styles.searchBar} placeholder="Search..." />
      </div>
      <h2 className={styles.trendP}>Trending Poll</h2>
      <PollsList
        data={data}
        fetchMoreData={function (): Promise<void> {
          throw new Error("Function not implemented.");
        }}
        isFetchingMore={false}
        hasMore={true}
      />
    </div>
  );
};

export default Explore;
