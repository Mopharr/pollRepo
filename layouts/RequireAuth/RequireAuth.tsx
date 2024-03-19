import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const RequireAuth = () => {
  const { isAuthenticated } = UserAuth();

  if (
    !isAuthenticated ||
    localStorage.getItem("access") === undefined ||
    localStorage.getItem("access") === null
  ) {
    return <Navigate to="/home" state={{ redirected: true }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
