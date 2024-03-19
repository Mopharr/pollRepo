import { useEffect, useState, useCallback } from "react";
import { axiosPrivate } from "../library/axios";
import { PollData } from "../types/fetchPolls.type";
import { Helmet } from "react-helmet";
import PollsList from "../components/PollsList/PollsList";
import { CircularProgress } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const WatchList = () => {
  useAxiosPrivate();
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [url, setUrl] = useState<string>("/?page=1");
  const [watchListData, setWatchLisData] = useState<PollData[]>([]);

  const fetchWatchList = useCallback(async () => {
    localStorage.removeItem("votedPolls");
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get<any>(
        `polls/monitored-polls${url}`
      );
      const { results, next } = response.data;
      console.log(results);
      setWatchLisData(results);
      setHasMore(next !== null);
      setError("");
    } catch (error: any) {
      // console.error(error?.response?.data);

      if (!error?.response) {
        setError("Check your internet connection");
      }

      if (error?.response) {
        setError("Error fetching monitored polls");
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const fetchMoreWatchList = async () => {
    if (!url || isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    try {
      const response = await axiosPrivate.get<any>(
        `polls/monitored-polls${url}`
      );
      const { results, next } = response.data;
      setWatchLisData((prevData) => [...prevData, ...results]);
      // const newNextVal = next.split("polls/monitored-polls")[1];
      // setUrl(newNextVal);
      // setHasMore(next !== null);

      const nextUrlList = next.split("/");
      const newNextVal = nextUrlList[nextUrlList.length - 1];
      setUrl(newNextVal);
      setHasMore(next !== null && next !== undefined);
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchWatchList();
  }, [fetchWatchList]);
  return (
    <>
      <Helmet>
        <title>Poll Details</title>
        <meta name="description" content="Polls Details" />
      </Helmet>

      <main>
        {isLoading ? (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress style={{ fontSize: "20px", color: "#ff4105" }} />
          </p>
        ) : watchListData.length > 0 ? (
          <PollsList
            data={watchListData}
            setData={setWatchLisData}
            fetchMoreData={fetchMoreWatchList}
            isFetchingMore={isFetchingMore}
            hasMore={hasMore}
          />
        ) : error ? (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              color: "#f00",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        ) : (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              color: "#262626;",
              fontWeight: "600",
            }}
          >
            You have no monitored polls
          </p>
        )}
      </main>
    </>
  );
};

export default WatchList;
