import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PollRepo: Your Digital Encyclopedia of Opinions</title>
        <link rel="icon" href="/polls.png" />
        <meta
          name="description"
          content="Explore PollRepo, the revolutionary platform where opinions meet data. Engage in structured voting, contribute to debates, and track trends in public sentiment on various topics."
        />
        {/* <meta
          name="description"
          content="Your digital encyclopedia of opinions"
        /> */}
        <meta
          name="keywords"
          content="PollRepo, Opinions, Voting, Public Sentiment, Debates, Popular, Popularity, Social Media, Polls, Trends, Community"
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
        <link rel="canonical" href="http://www.pollrepo.com/home" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
