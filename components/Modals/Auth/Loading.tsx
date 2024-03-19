import { type FC } from "react";
import { ModalWrapper } from "../../../ui";
import styles from "./loading.module.css";

type LoadingProps = {
  show: boolean;
};

const Loading: FC<LoadingProps> = ({ show }) => {
  if (!show) {
    return null;
  }
  return (
    <ModalWrapper className={styles.modalWrap}>
      <div className={styles.box}>
        <div className={styles["lds-spinner"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Loading;
