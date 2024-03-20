import { UserAuth } from "@/context/AuthContext";
import AuthHeader from "./AuthHeader";

const HeaderComponent: React.FC = () => {
  const { handleShowLoginModal } = UserAuth();

  return (
    <>
      <AuthHeader onLoginClick={handleShowLoginModal} />
      {/* {isAuthenticated ? (
        <AuthHeader onLoginClick={handleShowLoginModal} />
      ) : (
        <UnAuthHeader onLoginClick={handleShowLoginModal} />
      )} */}
    </>
  );
};

export default HeaderComponent;
