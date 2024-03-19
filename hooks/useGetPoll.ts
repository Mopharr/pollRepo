import { useState, useCallback, useEffect } from "react";
import { PollData } from "../types/fetchPolls.type";
import { axiosPrivate } from "../library/axios";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetPoll = (
  loggedinUser: boolean,
  username: string,
  tabType: "polls" | "votes"
) => {
  useAxiosPrivate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [userUrl, setUserUrl] = useState<string>("/?page=1");
  const [data, setData] = useState<PollData[]>([]);

  let url: string = "";

  if (tabType === "polls") {
    url = loggedinUser
      ? `polls/my-polls${userUrl}`
      : `polls/user-polls/${username}${userUrl}`;
  } else if (tabType === "votes") {
    url = loggedinUser
      ? `polls/voted-polls${userUrl}`
      : `polls/voted-polls/${username}${userUrl}`;
  }

  const fetchData = useCallback(async () => {
    localStorage.removeItem("votedPolls");
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get<any>(url);
      const { results, next } = response.data;
      setData(results);
      setHasMore(next !== null && next !== undefined);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const fetchMoreData = async () => {
    if (!userUrl || isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    try {
      const response = await axiosPrivate.get<any>(url);
      const { results, next } = response.data;
      setData((prevData) => [...prevData, ...results]);
      const nextUrlList = next.split("/");
      const newNextVal = nextUrlList[nextUrlList.length - 1];
      setUserUrl(newNextVal);
      setHasMore(next !== null && next !== undefined);
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    fetchMoreData,
    isFetchingMore,
    hasMore,
    isLoading,
    setData,
  };
};

export default useGetPoll;
