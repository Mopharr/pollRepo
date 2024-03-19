// import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import HeaderComponent from "@/components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/layouts/mainLayout/Layout";
import "./App.css";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const location = useLocation();

  const isAtResetPassword =
    location.pathname === "/forgot-password" ||
    location.pathname.includes("/auth/password/reset/confirm") ||
    location.pathname === "/verify-email";


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
      <ToastContainer
        limit={1}
        autoClose={3500}
        newestOnTop={true}
        closeButton={false}
        position="top-center"
        hideProgressBar={true}
      />
    </AuthProvider>
  );
}
