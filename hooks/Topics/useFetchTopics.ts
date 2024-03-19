import { useState, useEffect } from "react";
import {
  PollData,
  PollResponse,
  TrendsResponse,
} from "../../types/fetchPolls.type";

import { axiosPrivate } from "../../library/axios";

interface FetchPollsResponse {
  data: PollData[];
  count: number;
  next: string | null;
  previous: string | null;
  error: Error | null;
  isLoading: boolean;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  url: string;
}

const useFetchTrendingPolls = (): FetchPollsResponse => {
  const [data, setData] = useState<PollData[]>([]);
  const [count, setCount] = useState<number>(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [url, setUrl] = useState<string>("/polls/polls");



  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get<TrendsResponse>(url);
        if (isMounted) {
          const { results, count, next, previous } = response.data;
          console.log("testing topic polls", response.data);

          setData(results);
          setCount(count);
          setNext(next);
          setPrevious(previous);
        }
        setError(null);
      } catch (error) {
        if (isMounted) setError(error as Error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Immediate fetch on component mount
    fetchData();

    return () => {
      isMounted = false;
      //   clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, [url, axiosPrivate]);

  return { data, count, next, previous, error, isLoading, setUrl, url };
};

export default useFetchTrendingPolls;
