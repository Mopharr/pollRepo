import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { AuthProvider, UserAuth } from "@/context/AuthContext";
import HeaderComponent from "@/components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/layouts/mainLayout/Layout";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import UnRegisteredHome from "./UnRegisteredHome";
import RegistrationModal from "@/components/Modals/Auth/RegistrationModal";
import ConfirmModal from "@/components/Modals/Auth/ConfirmModal";
import Loading from "@/components/Modals/Auth/Loading";
import LoginModal from "@/components/Modals/Auth/LoginModal";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const {
    isAuthenticated,
    showAuthModal,
    handleShowAuthModal,
    showConfirmationModal,
    showLoginModal,
    googleAuthIsLoading,
    handleGoogleAuth,
  } = UserAuth();

  const { query } = router; // Access query parameters directly from the router


  // const userCode = query.code;

  const { pathname } = router;

  const userCode = Array.isArray(query.code) ? query.code[0] : query.code;

  const isAtResetPassword =
    router.pathname === "/forgot-password" ||
    router.pathname.includes("/auth/password/reset/confirm") ||
    router.pathname === "/verify-email";

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
    <>
      <ScrollToTop />
      <HeaderComponent />

      <div
        style={{
          display: isAtResetPassword ? "grid" : "",
          placeItems: isAtResetPassword ? "center" : "",
          height: isAtResetPassword ? "100vh" : "",
        }}
      >
        <UnRegisteredHome />
      </div>
      {/* <ToastContainer
        limit={1}
        autoClose={3500}
        newestOnTop={true}
        closeButton={false}
        position="top-center"
        hideProgressBar={true}
      /> */}
      <RegistrationModal show={showAuthModal} />
      <ConfirmModal show={showConfirmationModal} />
      <LoginModal show={showLoginModal} />
      <Loading show={googleAuthIsLoading} />
    </>
  );
}
