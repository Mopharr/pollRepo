import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import HomeLayout from "@/layouts/Home/HomeLayout";

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
        <HomeLayout />
      </DashboardLayout>
    </>
  );
};

export default UnRegisteredHome;
