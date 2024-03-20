import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { AuthProvider } from "@/context/AuthContext";
import HeaderComponent from "@/components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/layouts/mainLayout/Layout";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const isAtResetPassword =
    router.pathname === "/forgot-password" ||
    router.pathname.includes("/auth/password/reset/confirm") ||
    router.pathname === "/verify-email";

  return (
    <AuthProvider>
      <ScrollToTop />
      <HeaderComponent />

      <div
        style={{
          display: isAtResetPassword ? "grid" : "",
          placeItems: isAtResetPassword ? "center" : "",
          height: isAtResetPassword ? "100vh" : "",
        }}
      >
        
        <Layout />
      </div>
      {/* <ToastContainer
        limit={1}
        autoClose={3500}
        newestOnTop={true}
        closeButton={false}
        position="top-center"
        hideProgressBar={true}
      /> */}
    </AuthProvider>
  );
}
