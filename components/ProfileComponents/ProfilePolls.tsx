import React, { useState } from "react";
import styles from "./style.module.css";
import PollsList from "../PollsList/PollsList";
import { MdOutlineCancel } from "react-icons/md";
import { PollData } from "../../types/fetchPolls.type";
import CircularProgress from "@mui/material/CircularProgress";

interface PollsListProps {
  userData: PollData[];
  fetchMoreUserData: () => Promise<void>;
  isFetchingMore: boolean;
  hasMore: boolean;
  isLoading: boolean;
}

const ProfilePolls: React.FC<PollsListProps> = ({
  userData,
  fetchMoreUserData,
  isFetchingMore,
  hasMore,
  isLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentImage, setCurrentImage] = useState("");
  type SvgIconProps = React.SVGProps<SVGSVGElement> & {
    as: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };

  const SvgIcon: React.FC<SvgIconProps> = ({ as: SvgComponent, ...props }) => {
    return <SvgComponent {...props} width={40} height={40} />;
  };

  // const openModal = (image: string) => {
  //   setCurrentImage(image);
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.mainContent}>
      {isLoading ? (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress style={{ fontSize: "20px", color: "#ff4105" }} />
        </p>
      ) : userData.length > 0 ? (
        <PollsList
          data={userData}
          fetchMoreData={fetchMoreUserData}
          isFetchingMore={isFetchingMore}
          hasMore={hasMore}
        />
      ) : (
        <p>You don't have polls yet</p>
      )}

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* <img src={currentImage} alt="Expanded Option" /> */}
            <button onClick={closeModal} className={styles.modalCloseButton}>
              <MdOutlineCancel />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePolls;
