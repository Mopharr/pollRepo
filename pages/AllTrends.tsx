import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useFilterTrendingPolls } from "../context/TrendingPollsContext";
// import { ReactComponent as Threedot } from "../asset/svg/three_dot.svg";
import { ReactComponent as Loading } from "../asset/svg/LoadingIcon.svg";
import { ReactComponent as Onedot } from "../asset/svg/one_dot.svg";
import { formatNumber } from "../helpers";
import styles from "../components/Trends/Trends.module.css";

type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};
const AllTrends = () => {
  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={25} height={25} />;
  };

  const { data } = useFilterTrendingPolls();
  return (
    <>
      <Helmet>
        <title>Trends</title>
        <meta name="description" content="Trends" />
      </Helmet>

      <div className={styles.trendBox}>
        {data.map((trend) => {
          const dateOnly = trend?.deadline?.split("T")[0];
          return (
            <Link
              to={`/home/${trend.slug}`}
              className={styles.trendContainer}
              key={trend.id}
            >
              <div className={styles.trendHead}>
                <p className={styles.trendName}>
                  {trend.interests.length > 0 ? trend.interests[0]?.name : ""}
                </p>
                {/* <div style={{ position: "relative" }}>
                  <p>
                    <SvgIcon as={Threedot} className={styles.threedot} />
                  </p>
                </div> */}
              </div>

              <p
                className={styles.trendMText}
                dangerouslySetInnerHTML={{ __html: trend.question }}
              ></p>
              <div className={styles.trendBottom}>
                <p>{formatNumber(trend.votes_count)} voters</p>
                <p>
                  <SvgIcon as={Onedot} />{" "}
                  {formatNumber(trend.recent_votes_count)} recent votes
                </p>
                <p style={{ marginLeft: "0.4rem" }}>
                  <SvgIcon as={Loading} className={styles.loading} />
                  <span style={{ marginLeft: "0.4rem" }}>
                    {dateOnly ? dateOnly : "No deadline"}
                  </span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default AllTrends;
