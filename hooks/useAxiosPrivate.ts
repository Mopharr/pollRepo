import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../library/axios";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import useNotify from "./useNotify";

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const { auth, setAuth, sessionId, setIsAuthenticated } = UserAuth();
  const notify = useNotify();

  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers ?? {};

        if (!config?.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${
            localStorage.getItem("access") || auth?.access
          }`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,

      async (error) => {
        let prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest.hasSent) {
          prevRequest.hasSent = true;

          try {
            const {
              data: { access: newAccessToken },
            } = await refresh();

            setAuth((prev) => ({ ...prev, access: newAccessToken }));
            localStorage.setItem("access", newAccessToken);
            prevRequest = {
              ...prevRequest,
              headers: {
                ...prevRequest.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            };

            return axiosPrivate(prevRequest);
          } catch (error) {
            if ((error as AxiosError)?.response?.status === 401) {
              notify("Your session expired. Please log in again", "info", {
                toastId: sessionId,
              });

              setAuth({});
              setIsAuthenticated(false);
              localStorage.clear();
              navigate("/");
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [auth, refresh, notify, setAuth, navigate, sessionId, setIsAuthenticated]); // add "notify" to list of dependencies

  return axiosPrivate;
};

export default useAxiosPrivate;
