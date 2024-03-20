import {
  platform,
  corp,
  help,
  developer,
  business,
} from "@/constants/footer";
import { Link } from "react-router-dom";
import styles from "@/styles/privacy.module.css";
import { Container } from "@/ui";
import FooterLinks from "@/ui/FooterLinks/FooterLinks";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.linkBox}>
          <FooterLinks title="PollRepo platform" linkData={platform} />
          <FooterLinks title="PollRepo Corp" linkData={corp} />
          <FooterLinks title="Help" linkData={help} />
          <FooterLinks title="Developer resources" linkData={developer} />
          <FooterLinks title="Business resources" linkData={business} />
        </div>

        <div className={styles.bottomFooter}>
          <Link to="/corp">© 2024 PollRepo Corp.</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms and conditions</Link>
          <Link to="/language">English</Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
