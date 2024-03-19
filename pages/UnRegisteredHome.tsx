// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async";
import Home from "./Home";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

const UnRegisteredHome = () => {
  const { handleShowAuthModal } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirected = location.state?.redirected;

  useEffect(() => {
    if (redirected) {
      handleShowAuthModal();

      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, redirected: false },
      });
    }
  }, [redirected, handleShowAuthModal, location, navigate]);
  return (
    <>
      <Helmet>
        <title>Join Polls Repo</title>
        <meta
          name="description"
          content="Explore PollRepo, the revolutionary platform where opinions meet data. Engage in structured voting, contribute to debates, and track trends in public sentiment on various topics."
        />
      </Helmet>
      <Home />
    </>
  );
};

export default UnRegisteredHome;
