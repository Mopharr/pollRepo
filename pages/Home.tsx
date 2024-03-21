import styles from "../components/MainConent/styles.module.css";
import { useFilter } from "../context/FilterContext";
import PollsList from "../components/PollsList/PollsList";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, fetchMoreData, isFetchingMore, hasMore, setData, isLoading } =
    useFilter();

  return (
    <>
      <div className={styles.mainContent}>
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
        ) : data.length > 0 ? (
          <PollsList
            data={data}
            setData={setData}
            fetchMoreData={fetchMoreData}
            isFetchingMore={isFetchingMore}
            hasMore={hasMore}
          />
        ) : (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            NO Polls Available
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
