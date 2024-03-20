import Link from "next/link";
import styles from "./Policy.module.css";

const Policy = () => {
  return (
    <div className={styles.policyWrap}>
      <div className={styles.policy}>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/sitemap">Site Map</Link>
        <Link href="/privacy"> Accessibility</Link>
        <Link href="/tos"> User Agreement </Link>
        <Link href="/tos"> Terms of Service</Link>
        <Link href="/about">About</Link>
      </div>

      <div className={styles.whiteLine}></div>
      <p className={styles.cpr}>Poll Repo (c) 2023 All right reserved</p>
    </div>
  );
};

export default Policy;
