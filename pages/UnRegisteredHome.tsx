// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async";
import Home from "./Home";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";

const UnRegisteredHome = () => {
  const { handleShowAuthModal } = UserAuth();
  const router = useRouter();

  const redirected = router?.query?.redirected;

  useEffect(() => {
    if (redirected) {
      handleShowAuthModal();
      router.push(router?.pathname);
    }
  }, [redirected, handleShowAuthModal, router]);
  return (
    <>
      {/* <Helmet>
        <title>Join Polls Repo</title>
        <meta
          name="description"
          content="Explore PollRepo, the revolutionary platform where opinions meet data. Engage in structured voting, contribute to debates, and track trends in public sentiment on various topics."
        />
      </Helmet> */}
      <DashboardLayout>
        testing

        <Home />
      </DashboardLayout>
    </>
  );
};

export default UnRegisteredHome;
