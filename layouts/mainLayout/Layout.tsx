import { useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { useRouter } from "next/router";
import RegisteredLayout from "@/layouts/RegisterLayout/RegisteredLayout";
import UnRegisteredLayout from "@/layouts/UnRegisteredLayout/UnRegisteredLayout";
import RegistrationModal from "@/components/Modals/Auth/RegistrationModal";
import ConfirmModal from "@/components/Modals/Auth/ConfirmModal";
import LoginModal from "@/components/Modals/Auth/LoginModal";
import Loading from "@/components/Modals/Auth/Loading";
import AxiosPrivateProvider from "@/context/AxiosPrivateProvider";
import UnRegisteredHome from "@/pages/UnRegisteredHome";

const Layout = () => {
  const {
    isAuthenticated,
    showAuthModal,
    handleShowAuthModal,
    showConfirmationModal,
    showLoginModal,
    googleAuthIsLoading,
    handleGoogleAuth,
  } = UserAuth();

  const router = useRouter();

  const { query } = router; // Access query parameters directly from the router

  // const userCode = query.code;

  const { pathname } = router;

  const userCode = Array.isArray(query.code) ? query.code[0] : query.code;

  const isAtResetPassword =
    pathname === "/forgot-password" ||
    pathname.includes("/auth/password/reset/confirm") ||
    pathname === "/verify-email";

  useEffect(() => {
    if (userCode) {
      handleGoogleAuth({ code: userCode });
      // Clear the query parameters from the URL after handling them
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [userCode, handleGoogleAuth, router]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (
      !isAuthenticated &&
      !showLoginModal &&
      !userCode &&
      !isAtResetPassword
    ) {
      timer = setTimeout(() => {
        handleShowAuthModal();
      }, 10000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    isAuthenticated,
    showLoginModal,
    userCode,
    handleShowAuthModal,
    isAtResetPassword,
  ]);

  return (
    <div>
      {/* {!isAuthenticated ||
      localStorage.getItem("access") === undefined ||
      localStorage.getItem("access") === null ? ( */}
      <>
        <UnRegisteredHome />
      </>
      {/* ) : (
        <AxiosPrivateProvider>
          <RegisteredLayout />
        </AxiosPrivateProvider>
      )} */}
    
      <RegistrationModal show={showAuthModal} />
      {/*   <ConfirmModal show={showConfirmationModal} />
      <LoginModal show={showLoginModal} />
      <Loading show={googleAuthIsLoading} /> */}
    </div>
  );
};

export default Layout;
