import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { axiosPublic } from "../library/axios";
import { PollData, TrendsResponse } from "../types/fetchPolls.type";

type TrendingPollsProviderProps = {
  children: ReactNode;
};

const TrendingPollsContext = createContext<{
  data: PollData[];
  setCountryCode: React.Dispatch<React.SetStateAction<string>>;
}>({
  data: [],
  setCountryCode: () => {},
});

export const useFilterTrendingPolls = () => useContext(TrendingPollsContext);

export const TrendingPollsProvider = ({
  children,
}: TrendingPollsProviderProps) => {
  const [data, setData] = useState<PollData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("");

  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const trendQuery = countryCode
    ? `/?country_code=${countryCode.toLowerCase()}`
    : "";

  const fetchData = useCallback(async () => {
    console.log("testing if explore got here", )
    setIsLoading(true);

    try {
      const response = await axiosPublic.get<TrendsResponse>(
        `polls/trending${trendQuery}`
      );
      const { results } = response.data;
      setData(results);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [trendQuery]);

  useEffect(() => {
    // Access localStorage only in the client-side code
    if (typeof window !== "undefined") {
      const storedCountryCode = localStorage.getItem("countryCode");
      if (storedCountryCode) {
        setCountryCode(storedCountryCode);
      }
    }
  }, []);

  const fetchMoreTrending = async () => {};

  useEffect(() => {
    fetchData();
  }, [countryCode]);
  console.log("tesing treind data ",data)

  return (
    <TrendingPollsContext.Provider value={{ data, setCountryCode }}>
      {children}
    </TrendingPollsContext.Provider>
  );
};
