import { useState } from "react";
import styles from "./topicsToFollow.module.css";
import { ReactComponent as Plus } from "../../asset/svg/plus.svg";
import { UserAuth } from "../../context/AuthContext";
import { useFilter } from "../../context/FilterContext";
import { handlePrivateRequest } from "../../utils/http";
import useNotify from "../../hooks/useNotify";

const TopicsToFollow = () => {
  const [showAll, setShowAll] = useState(false); // State to track showing all data
  const { isAuthenticated, handleShowAuthModal, sessionId } = UserAuth();
  const { suggestedInterests, setSuggestedInterests } = useFilter();
  const notify = useNotify();

  const displayedData = showAll
    ? suggestedInterests
    : suggestedInterests.slice(0, 5);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleAddInterest = async (id: number) => {
    if (!isAuthenticated) {
      handleShowAuthModal();
      return;
    }

    try {
      await handlePrivateRequest("post", `/profiles/me/add-interest/${id}/`);

      setSuggestedInterests((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      // console.log(error?.response?.data);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify(error?.response?.data?.error, "error", {
          toastId: sessionId,
        });
      }
    }
  };

  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={18} height={18} color="red" />;
  };

  return (
    <div>
      <p className={styles.topicstofollowHead}>Topics to follow</p>
      {displayedData.length > 0 ? (
        displayedData.map((topicstofollow) => (
          <div key={topicstofollow.id} className={styles.topicstofollow}>
            <div className={styles.topicstofollowItems}>
              <p className={styles.topicstofollowadd}>{topicstofollow.name}</p>
              <button
                className={styles.topicstofollowadd}
                onClick={() => handleAddInterest(topicstofollow.id)}
              >
                <SvgIcon as={Plus} style={{ paddingRight: "5px" }} /> Add to
                interest
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.emptyInterest}>No more Interests</p>
      )}

      {displayedData.length > 0 && (
        <p onClick={toggleShowAll} className={styles.showMore}>
          {showAll ? "Show less" : "Show more"}
        </p>
      )}
    </div>
  );
};

export default TopicsToFollow;
