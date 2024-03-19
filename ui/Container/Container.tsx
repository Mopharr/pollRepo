import React, { type FC } from "react";
import styles from "./container.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container: FC<Props> = ({ children, className }) => {
  return <div className={`${styles.box} ${className}`}>{children}</div>;
};

export default Container;
