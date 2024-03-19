import { type FC } from "react";
import styles from "./switch.module.css";

type Props = {
  onChange: () => void;
  checked: boolean;
};

const CustomSwitch: FC<Props> = ({ onChange, checked }) => {
  return (
    <button
      className={`${styles.button} ${checked ? styles.active : ""}`}
      onClick={(e) => {
        onChange();
        e.stopPropagation();
      }}
    ></button>
  );
};

export default CustomSwitch;
