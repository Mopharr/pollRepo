import { type ReactNode, type FC } from "react";
import { createPortal } from "react-dom";
import styles from "./modalwrapper.module.css";

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
  className?: string;
};

const ModalWrapper: FC<ModalProps> = ({ children, onClose, className }) => {
  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.containerWrap} ${className}`}>{children}</div>
    </>,
    document.getElementById("modal-root")!
  );
};

export default ModalWrapper;
