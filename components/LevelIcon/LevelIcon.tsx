import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import Emperor from "@/public/asset/svg/levels/Emperor.svg";
import Shogun from "@/public/asset/svg/levels/Shogun.svg";
import Bashorun from "@/public/asset/svg/levels/Bashorun.svg";
import Daimyo from "@/public/asset/svg/levels/Daimyo.svg";
import Agbaakin from "@/public/asset/svg/levels/Agbaakin.svg";
import Alapini from "@/public/asset/svg/levels/Alapini.svg";
import Hatamoto from "@/public/asset/svg/levels/Hatamoto.svg";
import Samurai from "@/public/asset/svg/levels/Samurai.svg";
import Ronin from "@/public/asset/svg/levels/Ronin.svg";
import Ashipa from "@/public/asset/svg/levels/Ashipa.svg";
import Kobusho from "@/public/asset/svg/levels/Kobusho.svg";
import Sohei from "@/public/asset/svg/levels/Sohei.svg";
import Ninja from "@/public/asset/svg/levels/Ninja.svg";
import Shokunin from "@/public/asset/svg/levels/Shokunin.svg";
import Ashigaru from "@/public/asset/svg/levels/Ashigaru.svg";
import Legend from "@/public/asset/svg/levels/Legend.svg";

type Props = {
  level: string;
};

const LevelIcon = ({ level }: Props) => {
  switch (level) {
    case "Emperor":
      return <Image alt="" src={Emperor} className={styles.levelIcon} />;
    case "Shogun":
      return <Image alt="" src={Shogun} className={styles.levelIcon} />;
    case "Bashorun":
      return <Image alt="" src={Bashorun} className={styles.levelIcon} />;
    case "Daimyo":
      return <Image alt="" src={Daimyo} className={styles.levelIcon} />;
    case "Agbaakin":
      return <Image alt="" src={Agbaakin} className={styles.levelIcon} />;
    case "Alapini":
      return <Image alt="" src={Alapini} className={styles.levelIcon} />;
    case "Hatamoto":
      return <Image alt="" src={Hatamoto} className={styles.levelIcon} />;
    case "Samurai":
      return <Image alt="" src={Samurai} className={styles.levelIcon} />;
    case "Ronin":
      return <Image alt="" src={Ronin} className={styles.levelIcon} />;
    case "Ashipa":
      return <Image alt="" src={Ashipa} className={styles.levelIcon} />;
    case "Ko-busho":
      return <Image alt="" src={Kobusho} className={styles.levelIcon} />;
    case "Sohei":
      return <Image alt="" src={Sohei} className={styles.levelIcon} />;
    case "Ninja":
      return <Image alt="" src={Ninja} className={styles.levelIcon} />;
    case "Shokunin":
      return <Image alt="" src={Shokunin} className={styles.levelIcon} />;
    case "Ashigaru":
      return <Image alt="" src={Ashigaru} className={styles.levelIcon} />;
    default:
      return <Image alt="" src={Legend} className={styles.levelIcon} />;
  }
};

export default LevelIcon;
