import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useId,
} from "react";
import { useRouter } from "next/router";

import { handlePrivateRequest, handlePublicRequest } from "../utils/http";
import { Data } from "../helpers";
import useNotify from "../hooks/useNotify";
import {
  PayloadData,
  LoginFormData,
} from "../components/Modals/Auth/LoginModal";
import { UserProfile } from "../types/auth";

type AuthState = {
  access?: string;
  refresh?: string;
};

type GooglePayload = {
  code: string;
};

export interface HandleLogin<T> {
  (
    payload: T,
    resetData: React.Dispatch<React.SetStateAction<LoginFormData>>,
    resetErrors: React.Dispatch<React.SetStateAction<LoginFormData>>
  ): Promise<void>;
}
interface AuthContextProps {
  loginIsLoading: boolean;
  signUpIsLoading: boolean;
  googleAuthIsLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  showAuthModal: boolean;
  showCreateAccount: boolean;
  showConfirmationModal: boolean;
  userData: UserData;
  showLoginModal: boolean;
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  signUpError: { [key: string]: [] };
  loginError: { [key: string]: [] };
  sessionId: string;
  logoutUser: () => void;
  handleShowAuthModal: () => void;
  handleCloseAuthModal: () => void;
  handleShowCreateAccount: () => void;
  handleCloseCreateAccount: () => void;
  handleShowConfirmModal: () => void;
  handleCloseConfirmModal: () => void;
  handleShowLoginModal: () => void;
  handleCloseLoginModal: () => void;
  handleSignUp: (payLoad: Data) => void;
  handleLogin: HandleLogin<PayloadData>;
  handleGoogleAuth: (payLoad: GooglePayload) => void;
}

type UserData = {
  pk: number;
  email: string;
};

type ResponseData = {
  access: string;
  refresh: string;
  user: UserData;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const notify = useNotify();
  const sessionId = useId();

  const [auth, setAuth] = useState<AuthState>({});
  const [userData, setUserData] = useState<UserData>({
    pk: 0,
    email: "",
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loginIsLoading, setLoginIsLoading] = useState<boolean>(false);
  const [signUpIsLoading, setSignUpIsLoading] = useState<boolean>(false);
  const [googleAuthIsLoading, setGoogleAuthIsLoading] =
    useState<boolean>(false);
  const [signUpError, setSignUpError] = useState({});
  const [loginError, setLoginError] = useState({});
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const handleShowAuthModal = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleShowCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const handleCloseCreateAccount = () => {
    setShowCreateAccount(false);
  };

  const handleShowConfirmModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmationModal(false);
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    const storedUser = localStorage.getItem("user");
    if (storedAccess && storedUser) {
      setIsAuthenticated(true);
      setAuth({ access: storedAccess });
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    async function getUserProfile() {
      try {
        const data = (await handlePrivateRequest(
          "get",
          "/profiles/profile/"
        )) as any;

        const profileData = data.profile as UserProfile;

        setUserProfile(profileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    if (isAuthenticated) {
      getUserProfile();
    }
  }, [isAuthenticated]);

  const handleSignUp = async (payLoad: Data) => {
    setSignUpIsLoading(true);

    try {
      const data = (await handlePublicRequest<Data>(
        "post",
        "/auth/registration/",
        payLoad
      )) as ResponseData;

      // console.log(data);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setAuth({
        access: data.access,
        refresh: data.refresh,
      });
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUserData(data.user);
      router.push("/home");
      handleCloseCreateAccount();
      handleCloseAuthModal();
      handleShowConfirmModal();
    } catch (error: any) {
      // console.log(error?.response?.data);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify("Error creating account", "error", {
          toastId: sessionId,
        });
      }
      setSignUpError(error?.response?.data);
    } finally {
      setSignUpIsLoading(false);
    }
  };

  const handleGoogleAuth = async (payLoad: GooglePayload) => {
    setGoogleAuthIsLoading(true);

    try {
      const data = (await handlePublicRequest<GooglePayload>(
        "post",
        "/auth/google/",
        payLoad
      )) as ResponseData;

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setAuth({
        access: data.access,
        refresh: data.refresh,
      });
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUserData(data.user);
      router.push("/home");
      handleCloseCreateAccount();
      handleCloseAuthModal();
    } catch (error: any) {
      // console.log(error?.response?.data);

      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify("An error occurred. Please try again!", "error", {
          toastId: sessionId,
        });
      }
    } finally {
      setGoogleAuthIsLoading(false);
    }
  };

  const handleLogin: HandleLogin<PayloadData> = async (
    payLoad,
    resetData,
    resetErrors
  ) => {
    setLoginIsLoading(true);
    try {
      const data = (await handlePublicRequest<PayloadData>(
        "post",
        "/auth/login/",
        payLoad
      )) as ResponseData;

      // console.log(data);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setAuth({
        access: data.access,
        refresh: data.refresh,
      });
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUserData(data.user);
      router.push("/home");
      handleCloseCreateAccount();
      handleCloseAuthModal();
      resetData({
        userId: "",
        password: "",
      });
      resetErrors({
        userId: "",
        password: "",
      });
      handleCloseLoginModal();
    } catch (error: any) {
      // console.log(error?.response?.data);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify("Unable to login", "error", {
          toastId: sessionId,
        });
      }
      setLoginError(error?.response?.data);
    } finally {
      setLoginIsLoading(false);
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    router.push("/");
  };


  return (
    <AuthContext.Provider
      value={{
        sessionId,
        isAuthenticated,
        signUpIsLoading,
        loginIsLoading,
        googleAuthIsLoading,
        setIsAuthenticated,
        auth,
        userData,
        userProfile,
        setUserProfile,
        signUpError,
        loginError,
        setAuth,
        logoutUser,
        showAuthModal,
        showCreateAccount,
        showConfirmationModal,
        showLoginModal,
        handleShowAuthModal,
        handleCloseAuthModal,
        handleShowCreateAccount,
        handleCloseCreateAccount,
        handleShowConfirmModal,
        handleCloseConfirmModal,
        handleShowLoginModal,
        handleCloseLoginModal,
        handleSignUp,
        handleLogin,
        handleGoogleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
