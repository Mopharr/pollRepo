import React, { useEffect } from "react";
import styles from "../styles/explore.module.css";
import Trends from "../components/Trends/Trends";
import Loading from "@/public/asset/svg/LoadingIcon.svg";
import Search from "@/public/asset/svg/search.svg";
import Onedot from "@/public/asset/svg/one_dot.svg";
import TopicsToFollow from "@/components/TopicsToFollow/TopicsToFollow";
import { TrendingPollsProvider, useFilterTrendingPolls } from "@/context/TrendingPollsContext";
import PollsList from "@/components/PollsList/PollsList";
import Image from "next/image";
import HeaderComponent from "@/components/Header/Header";
import AxiosPrivateProvider from "@/context/AxiosPrivateProvider";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";

const Explore = () => {
  const { data } = useFilterTrendingPolls();

  useEffect(() => {
    console.log("Data has changed:", data);
  }, [data]);

  console.log("testing trendings ", data )
  return (
    <TrendingPollsProvider>
        <AxiosPrivateProvider>
        <HeaderComponent />
        <DashboardLayout>

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
        </DashboardLayout>
        </AxiosPrivateProvider>
    </TrendingPollsProvider>
  );
};

export default Explore;
