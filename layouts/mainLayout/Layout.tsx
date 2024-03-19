import { useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useSearchParams, useLocation } from "react-router-dom";
import RegisteredLayout from "../RegisterLayout/RegisteredLayout";
import UnRegisteredLayout from "../UnRegisteredLayout/UnRegisteredLayout";
import RegistrationModal from "../../components/Modals/Auth/RegistrationModal";
import ConfirmModal from "../../components/Modals/Auth/ConfirmModal";
import LoginModal from "../../components/Modals/Auth/LoginModal";
import Loading from "../../components/Modals/Auth/Loading";
import AxiosPrivateProvider from "../../context/AxiosPrivateProvider";

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

  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const userCode = urlSearchParams.get("code");

  const { pathname } = useLocation();

  const isAtResetPassword =
    pathname === "/forgot-password" ||
    pathname.includes("/auth/password/reset/confirm") ||
    pathname === "/verify-email";

  useEffect(() => {
    if (userCode) {
      handleGoogleAuth({ code: userCode });
      setUrlSearchParams("");
    }
  }, [userCode, setUrlSearchParams, handleGoogleAuth]);

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
      {!isAuthenticated ||
      localStorage.getItem("access") === undefined ||
      localStorage.getItem("access") === null ? (
        <>
          <UnRegisteredLayout />
        </>
      ) : (
        <AxiosPrivateProvider>
          <RegisteredLayout />
        </AxiosPrivateProvider>
      )}

      <RegistrationModal show={showAuthModal} />
      <ConfirmModal show={showConfirmationModal} />
      <LoginModal show={showLoginModal} />
      <Loading show={googleAuthIsLoading} />
    </div>
  );
};

export default Layout;
