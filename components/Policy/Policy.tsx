import { Link } from "react-router-dom";
import styles from "./Policy.module.css";

const Policy = () => {
  return (
    <div className={styles.policyWrap}>
      <div className={styles.policy}>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/sitemap">Site Map</Link>
        <Link to="/privacy"> Accessibility</Link>
        <Link to="/tos"> User Agreement </Link>
        <Link to="/tos"> Terms of Service</Link>
        <Link to="/about">About</Link>
      </div>

      <div className={styles.whiteLine}></div>
      <p className={styles.cpr}>Poll Repo (c) 2023 All right reserved</p>
    </div>
  );
};

export default Policy;
