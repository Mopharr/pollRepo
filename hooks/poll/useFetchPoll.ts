import { useState, useEffect } from "react";
import { PollData, PollResponse } from "../../types/fetchPolls.type";
import { axiosPrivate } from "../../library/axios";

interface FetchPollsResponse {
  data: PollData[];
  error: Error | null;
  isLoading: boolean;

}

const useFetchPolls = (): FetchPollsResponse => {
  const [data, setData] = useState<PollData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("page=1"); // Initial URL

  useEffect(() => {

    const fetchData = async () => {
 
      try {
        const response = await axiosPrivate.get<PollResponse>(`polls/polls/?${url}`);
        const { results, count, next, previous } = response.data.Poll;
        setData(results);
        setError(null);
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [axiosPrivate]);
  return {data, error, isLoading,  };
};

export default useFetchPolls;
