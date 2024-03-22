import { Helmet } from "react-helmet";
import Profile from "../../pages/profile/[username]";
import { UserAuth } from "../../context/AuthContext";
import styles from "../../styles/style.module.css";
import { FilterProvider } from "../../context/FilterContext";

const ProfileLayout = () => {
  const { userProfile } = UserAuth();

  return (
    <div>
      <FilterProvider>
        <Helmet>
          <title>{`${userProfile?.username} Profile`}</title>
          <meta name="description" content="Profile" />
        </Helmet>
        <div className={styles.ProfileLayout}>
          <Profile />
        </div>
      </FilterProvider>
    </div>
  );
};

export default ProfileLayout;
