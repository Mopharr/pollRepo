import { FC } from "react";
import { ModalWrapper } from "../../../ui";
import check from "../../../asset/svg/check.svg";
import { UserAuth } from "../../../context/AuthContext";
import styles from "./confirm.module.css";
import Image from "next/image";

type Props = {
  show: boolean;
};

const ConfirmModal: FC<Props> = ({ show }) => {
  const { handleCloseConfirmModal, userData } = UserAuth();

  const handleGotItClick = () => {
    handleCloseConfirmModal();
  };

  if (!show) {
    return null;
  }
  return (
    <ModalWrapper onClose={handleGotItClick}>
      <div className={styles.check}>
        <div className={styles.checkSub}>
          <Image src={check} alt="check" />
          <p>Check your Email</p>
        </div>
        <div className={styles.poll}>
          <div className={styles.pollText}>
            <p>Poll Repo sent a confirmation email to:</p>
            <p>
              <span>{userData?.email}</span>
              click the verify link in the email to secure your Poll Repo
              account.
            </p>
          </div>

          <button onClick={handleGotItClick} className={styles.button}>
            Got It
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
