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
   
      <DashboardLayout>
        <Home />
      </DashboardLayout>
    </>
  );
};

export default UnRegisteredHome;
