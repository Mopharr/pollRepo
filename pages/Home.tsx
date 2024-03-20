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
      {/* <Helmet>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PollRepo: Your Digital Encyclopedia of Opinions</title>
        <meta
          name="description"
          content="Explore PollRepo, the revolutionary platform where opinions meet data. Engage in structured voting, contribute to debates, and track trends in public sentiment on various topics."
        />
        <meta
          name="keywords"
          content="PollRepo, pollsRepo, famous, favourite, favorite , who is, what is, vote, opinion, Opinions, Voting, Public Sentiment, Debates, Popular, Popularity, Social Media, Polls, Trends, Community"
        />
        <meta name="author" content="PollRepo Team" />

        <meta
          property="og:title"
          content="PollRepo: Digital Encyclopedia of Opinions"
        />
        <meta
          property="og:description"
          content="Join PollRepo to explore, contribute, and witness the evolution of public sentiment across a wide array of topics. Discover what makes PollRepo a unique platform for sharing and viewing opinions."
        />
        <meta property="og:image" content="%PUBLIC_URL%/polls-social.png" />
        <meta property="og:url" content="http://www.pollrepo.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/home" />
      </Helmet> */}
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
