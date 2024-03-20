import { Routes, Route, Navigate } from "react-router-dom";
import HomeLayout from "../Home/HomeLayout";
// import NotificationLayout from "../Notification/NotificationLayout";
import ProfileLayout from "../ProfileLayout/ProfileLayout";
import LegecyPollLayout from "../LegacyPollLayout/LegecyPollLayout";
import NotFoundPage from "@/pages/PageNotFound";
import EditProfile from "@/pages/EditProfile";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import PollDetailsLayout from "../PollDetailsLayout/PollsDetailLayout";
import PrivacyPolicyLayout from "../PrivacyLayout/PrivacyPolicyLayout";
import TosLayout from "../PrivacyLayout/TosLayout";
import VerifyEmail from "@/pages/VerifyEmail";
import AllTrends from "@/pages/AllTrends";
import About from "@/pages/About";
import FooterLayout from "../FooterLayout/FooterLayout";
import WatchList from "@/pages/WatchList";
import Explore from "@/pages/Explore";

const RegisteredLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route element={<DashboardLayout />}>
        <Route path="/home" element={<HomeLayout />} />
        <Route path="/:slug" element={<PollDetailsLayout />} />
       <Route path="/trends" element={<AllTrends />} />
       <Route path="/explore" element={<Explore />} />
        {/* <Route path="/notification" element={<NotificationLayout />} /> */}
        <Route path="/legacy_poll" element={<LegecyPollLayout />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Route>
      <Route path="/profile/:username" element={<ProfileLayout />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route element={<FooterLayout />}>
        <Route path="/privacy" element={<PrivacyPolicyLayout />} />
        <Route path="/tos" element={<TosLayout />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RegisteredLayout;
