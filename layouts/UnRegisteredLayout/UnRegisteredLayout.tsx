import { Routes, Route, Navigate } from "react-router-dom";
import UnRegisteredHome from "../../pages/UnRegisteredHome";
import NotFoundPage from "../../pages/PageNotFound";
import ForgotPassword from "../../pages/ForgotPassword";
import PasswordReset from "../../pages/PasswordReset";
import { FilterProvider } from "../../context/FilterContext";
import VerifyEmail from "../../pages/VerifyEmail";
import PrivacyPolicyLayout from "../PrivacyLayout/PrivacyPolicyLayout";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import TosLayout from "../PrivacyLayout/TosLayout";
import AllTrends from "../../pages/AllTrends";
import FooterLayout from "../FooterLayout/FooterLayout";
import About from "../../pages/About";
import PollDetailsLayout from "../PollDetailsLayout/PollsDetailLayout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";
import EditProfile from "../../pages/EditProfile";
// import NotificationLayout from "../Notification/NotificationLayout";
import WatchList from "../../pages/WatchList";
import RequireAuth from "../RequireAuth/RequireAuth";

const UnRegisteredLayout = () => {
  return (
    <FilterProvider>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<UnRegisteredHome />} />
          <Route path="/home/:slug" element={<PollDetailsLayout />} />
          <Route path="/trends" element={<AllTrends />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/profile/:username" element={<ProfileLayout />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          {/* <Route path="/notification" element={<NotificationLayout />} /> */}
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </FilterProvider>
  );
};

export default UnRegisteredLayout;
