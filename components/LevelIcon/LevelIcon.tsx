import {
  Agbaakin,
  Alapini,
  Ashigaru,
  Ashipa,
  Bashorun,
  Daimyo,
  Emperor,
  Hatamoto,
  Kobusho,
  Ninja,
  Ronin,
  Samurai,
  Shogun,
  Shokunin,
  Legend,
  Sohei,
} from "../../asset/svg/levels";
import styles from "../../styles/Profile.module.css";

type Props = {
  level: string;
};
const LevelIcon = ({ level }: Props) => {
  if (level === "Emperor") {
    return <Emperor className={styles.levelIcon} />;
  } else if (level === "Shogun") {
    return <Shogun className={styles.levelIcon} />;
  } else if (level === "Bashorun") {
    return <Bashorun className={styles.levelIcon} />;
  } else if (level === "Daimyo") {
    return <Daimyo className={styles.levelIcon} />;
  } else if (level === "Agbaakin") {
    return <Agbaakin className={styles.levelIcon} />;
  } else if (level === "Alapini") {
    return <Alapini className={styles.levelIcon} />;
  } else if (level === "Hatamoto") {
    return <Hatamoto className={styles.levelIcon} />;
  } else if (level === "Samurai") {
    return <Samurai className={styles.levelIcon} />;
  } else if (level === "Ronin") {
    return <Ronin className={styles.levelIcon} />;
  } else if (level === "Ashipa") {
    return <Ashipa className={styles.levelIcon} />;
  } else if (level === "Ko-busho") {
    return <Kobusho className={styles.levelIcon} />;
  } else if (level === "Sohei") {
    return <Sohei className={styles.levelIcon} />;
  } else if (level === "Ninja") {
    return <Ninja className={styles.levelIcon} />;
  } else if (level === "Shokunin") {
    return <Shokunin className={styles.levelIcon} />;
  } else if (level === "Ashigaru") {
    return <Ashigaru className={styles.levelIcon} />;
  }

  return <Legend className={styles.levelIcon} />;
};

export default LevelIcon;
