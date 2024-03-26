import { Routes, Route, Navigate } from "react-router-dom";
import UnRegisteredHome from "@/pages/UnRegisteredHome";
import NotFoundPage from "@/pages/PageNotFound";
import ForgotPassword from "@/pages/auth/forgotpassword";
import PasswordReset from "@/pages/PasswordReset";
import { FilterProvider } from "@/context/FilterContext";
import VerifyEmail from "@/pages/VerifyEmail";
import PrivacyPolicyLayout from "../PrivacyLayout/PrivacyPolicyLayout";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import TosLayout from "../PrivacyLayout/TosLayout";
import AllTrends from "@/pages/AllTrends";
import FooterLayout from "../FooterLayout/FooterLayout";
import About from "@/pages/About";
import PollDetailsLayout from "@/layouts/PollDetailsLayout/PollsDetailLayout";
import ProfileLayout from "@/layouts/ProfileLayout/ProfileLayout";
import EditProfile from "@/pages/profile/editprofile";
// import NotificationLayout from "../Notification/NotificationLayout";
import WatchList from "@/pages/watchlist";
import RequireAuth from "@/layouts/RequireAuth/RequireAuth";

const UnRegisteredLayout = () => {
  return (
    <FilterProvider>
     <h1>
      ss
     </h1>

        {/* <Route path="/" element={<Navigate to="/" />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<UnRegisteredHome />} />
          <Route path="/home/:slug" element={<PollDetailsLayout />} />
          <Route path="/trends" element={<AllTrends />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/profile/:username" element={<ProfileLayout />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/notification" element={<NotificationLayout />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/api/v1/auth/password/reset/confirm/:uid/:token"
          element={<PasswordReset />}
        />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route element={<FooterLayout />}>
          <Route path="/privacy" element={<PrivacyPolicyLayout />} />
          <Route path="/tos" element={<TosLayout />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} /> */}
    </FilterProvider>
  );
};

export default UnRegisteredLayout;
