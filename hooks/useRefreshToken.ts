import { UserAuth } from "../context/AuthContext";
import { axiosPublic } from "../library/axios";

const useRefreshToken = () => {
  const { auth } = UserAuth();

  const refresh = () =>
    axiosPublic.post("/auth/token/refresh/", {
      refresh: auth?.refresh || localStorage.getItem("refresh"),
    });

  return refresh;
};

export default useRefreshToken;
