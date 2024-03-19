import React, { useState } from "react";
import styles from "./styles.module.css";
import data from "../../data/data";
import { ReactComponent as oneDot } from "../../asset/svg/one_dot.svg";
import { ReactComponent as ThreeDot } from "../../asset/svg/three_dot.svg";
import { Button } from "antd";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { TbUser } from "react-icons/tb";
import { PiShare } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";

const MainContent = () => {
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
      {data.map((poll) => (
        <div key={poll.id}>
          <div className={styles.pollWrapH}>
            <div className={styles.pollWrap}>
              <img src={poll.image} alt="" />
              <span className={styles.userName}>
                {poll.userName}
                <span className={`${styles.userName2} ${styles.truncateText}`}>
                  @{poll.userName}
                </span>
              </span>
              <SvgIcon as={oneDot} />
              <span className={styles.userName2}>{poll.hours}hr</span>
            </div>
            <SvgIcon as={ThreeDot} className={styles.userName3} />
          </div>
          <div className={styles.pollWrapCon}>
            <div>
              <p className={styles.textContent}>{poll.mainText}</p>

              <div className={styles.optionsWrap}>
                {poll.options.map((option, index) => (
                  <div key={index} className={styles.optionWithImage}>
                    <Button className={styles.options}>{option.name}</Button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.viewMore}>
              <p className={styles.viewMoreP}>View more</p>
              <span>|</span>
              <p className={styles.viewMorePOA}>
                Add Opinion
                <span className={styles.viewMorePNO}> No deadline</span>
              </p>
              <span>
                <GoDotFill color="#777777" />{" "}
              </span>
              <p className={styles.votes}>596 votes</p>
            </div>
            <div className={styles.lcs}>
              <p>
                <span>
                  <CiHeart color="#777777" />
                </span>{" "}
                124
              </p>
              <p>
                <span>
                  <FaRegComment color="#777777" />
                </span>{" "}
                56
              </p>
              <p>
                <span>
                  <TbUser color="#777777" />
                </span>{" "}
                24K
              </p>
              <p>
                <span>
                  <PiShare color="#777777" />
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}

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

export default MainContent;
