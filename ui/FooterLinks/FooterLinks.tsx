import { type FC } from "react";
import { Link } from "react-router-dom";
import styles from "./footerlink.module.css";

type Props = {
  title: string;
  linkData: string[];
};

const FooterLinks: FC<Props> = ({ title, linkData }) => {
  return (
    <div className={styles.footerLink}>
      <p>{title}</p>
      <ul className={styles.ul}>
        {linkData.map((link, index) => (
          <li key={index}>
            <Link to="/#">{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
