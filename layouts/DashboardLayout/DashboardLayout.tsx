import styles from "../../styles/style.module.css";
import { Outlet } from "react-router-dom";
import { FilterProvider } from "../../context/FilterContext";
import TrendsAndFollow from "../TrendsAndFollow/TrendsAndFollow";
import AuthSideBar from "../../components/Sidebar/AuthSideBar";
import { TrendingPollsProvider } from "../../context/TrendingPollsContext";
import useScroll from "../../hooks/useScroll";
import { UserAuth } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { isFixed: trendIsFixed, elementRef: trendRef } = useScroll();

  const { isAuthenticated } = UserAuth();

  return (
    <TrendingPollsProvider>
      <FilterProvider>
        <div className={styles.layoutMagic}>
          <div className={styles.layout}>
            <div
              className={styles.explore}

              //   ${
              //     exploreIsFixed ? styles.exploreFixed : ""
              //  }
              // }
              // ref={exploreRef}
            >
              <AuthSideBar />
            </div>
            <div className={styles.scrollableContent}>
              <div className={styles.mainContent}>
                <Outlet />
              </div>
              <div
                className={`${styles.trend} ${
                  trendIsFixed && isAuthenticated
                    ? styles.fixed
                    : styles.fixedVariant
                }`}
                ref={trendRef}
              >
                <TrendsAndFollow />
              </div>
            </div>
          </div>
        </div>
      </FilterProvider>
    </TrendingPollsProvider>
  );
};

export default DashboardLayout;
