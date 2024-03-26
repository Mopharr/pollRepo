import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { axiosPublic, axiosPrivate } from "../library/axios";
import { PollData } from "../types/fetchPolls.type";
import { handlePrivateRequest } from "../utils/http";
import { UserAuth } from "./AuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useRouter } from "next/router";

export type FilterState = {
  legacyPollsOnly: boolean;
  excludeExpiredPolls: boolean;
  excludeVotedPolls: boolean;
};

const defaultFilterState: FilterState = {
  legacyPollsOnly: false,
  excludeExpiredPolls: false,
  excludeVotedPolls: false,
};

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  data: PollData[];
  setData: React.Dispatch<React.SetStateAction<PollData[]>>;
  fetchMoreData: () => Promise<void>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;

  suggestedInterests: SuggestedInterest[];
  setSuggestedInterests: React.Dispatch<
    React.SetStateAction<SuggestedInterest[]>
  >;
  isLoading: boolean;
  isFetchingMore: boolean;
  updateSearchParams: (newParams: { interests: string }) => void;
  hasMore: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

type FilterProviderProps = {
  children: ReactNode;
};

type SuggestedInterest = {
  id: number;
  name: string;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  useAxiosPrivate();
  const [filters, setFilters] = useState(defaultFilterState);
  const [originalData, setOriginalData] = useState<PollData[]>([]);
  const [data, setData] = useState<PollData[]>([]);
  const [url, setUrl] = useState<string>("/?page=1");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingInterest, setIsLoadingInterest] = useState<boolean>(false);
  const [suggestedInterests, setSuggestedInterests] = useState<
    SuggestedInterest[]
  >([]);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { isAuthenticated } = UserAuth();

  const router = useRouter();
  const searchValue = router.query.interests as string | undefined;
  // const searchValue = urlSearchParams.get("interests");
  const topicsQuery = searchValue ? `&interests=${searchValue}` : "";

  const updateSearchParams = (newParams: { interests: string }) => {
    const currentParams = { ...router.query }; // Get current query parameters
    const updatedParams = { ...currentParams, ...newParams }; // Merge with new parameters
    router.push({ pathname: router.pathname, query: updatedParams }); // Update URL with new parameters
  };
  const fetchData = useCallback(async () => {
    localStorage.removeItem("votedPolls");
    setIsLoading(true);
    try {
      const response = isAuthenticated
        ? await axiosPrivate.get<any>(`polls/polls${url}${topicsQuery}`)
        : await axiosPublic.get<any>(`polls/polls${url}${topicsQuery}`);
      const { results, next } = response.data.Poll;
      setData(results);
      setOriginalData(results);
      setHasMore(next !== null);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [topicsQuery, url, isAuthenticated]);

  const fetchMoreData = async () => {
    if (!url || isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    try {
      const response = isAuthenticated
        ? await axiosPrivate.get<any>(`polls/polls${url}${topicsQuery}`)
        : await axiosPublic.get<any>(`polls/polls${url}${topicsQuery}`);
      const { results, next } = response.data.Poll;
      setData((prevData) => [...prevData, ...results]);
      const newNextVal = next.split("polls/polls")[1];
      setUrl(newNextVal);
      setHasMore(next !== null);
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };
  useEffect(() => {
    let filteredData = [...originalData];

    if (filters.legacyPollsOnly) {
      filteredData = filteredData.filter((poll) => poll.is_legacy);
    }
    if (filters.excludeExpiredPolls) {
      filteredData = filteredData.filter((poll) => !poll.is_ended);
    }
    if (filters.excludeVotedPolls) {
      filteredData = filteredData.filter((poll) => !poll.has_voted);
    }
    setData(filteredData);
  }, [filters, originalData]);


  useEffect(() => {
    if (searchValue) {
      fetchData();
    }
    // This runs when the Home component mounts the dom
    // Remove the condition and directly call fetchData()
    else {
      fetchData();
    }
  }, [searchValue]);

  const fetchSuggestedInterests = async () => {
    setIsLoadingInterest(true);
    try {
      const data = (await handlePrivateRequest(
        "get",
        "/profiles/me/uninterests/"
      )) as SuggestedInterest[];

      setSuggestedInterests(data.slice(0, 10));
    } catch (error: any) {
      console.log(error?.response?.data);
      if (!error?.response) {
        console.log("Check your internet connection");
      }
      if (error?.response) {
        console.log("Error fetching interests");
      }
    } finally {
      setIsLoadingInterest(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSuggestedInterests();
    }
  }, [isAuthenticated]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        data,
        setData,
        suggestedInterests,
        setSuggestedInterests,
        fetchMoreData,
        updateSearchParams,
        url,
        setUrl,
        isLoading,
        isFetchingMore,
        hasMore,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
