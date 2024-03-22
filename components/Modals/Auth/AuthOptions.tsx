import { type FC } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Cancle from "../../../asset/svg/cancle.svg";
import Logo from "../../../asset/image/Prl02r.png";
import styles from "./authoptions.module.css";
import { UserAuth } from "../../../context/AuthContext";
import { reachGoogle } from "../../../utils/reachGoogle";
import Link from "next/link";
import google from "../../../asset/image/google.png";
import Image from "next/image";

type Props = {
  onClose: () => void;
};

const AuthOptions: FC<Props> = ({ onClose }: Props) => {
  const {
    handleShowCreateAccount,
    handleCloseAuthModal,
    handleCloseCreateAccount,
    handleShowLoginModal,
  } = UserAuth();

  const handleGoToLogin = () => {
    handleCloseAuthModal();
    handleCloseCreateAccount();
    handleShowLoginModal();
  };

  return (
    <>
      <Image onClick={onClose} src={Cancle} className={styles.cancle} alt="" />
      <div className={styles.container}>
        <Image src={Logo} className={styles.LogoImage} alt="" />
        <h4 className={styles.h4o}>
          Join <span style={{ color: "#ff4105" }}>Poll</span>
          <span style={{ color: "#006ca5" }}>Repo</span> Today
        </h4>
        <div className={styles.modalBody}>
          <button className={`${styles.modalAuthButton} ${styles.appleButton}`}>
            <FaApple className={styles.authLogo} size={28} />
            Continue with Apple
          </button>

          <button
            className={`${styles.modalAuthButton} ${styles.googleButton}`}
            onClick={reachGoogle}
          >
            {/* <FaGoogle className={styles.authLogo} size={28} /> */}
            <Image src={google} alt="" />
            Continue with Google
          </button>

          <div className={styles.orSeparator}>or</div>
          <button
            className={styles.modalCreateAccountButton}
            onClick={handleShowCreateAccount}
          >
            Create Account
          </button>
        </div>

        <p className={styles.signTC}>
          By signing up, I’ve read and agreed to the
          <Link href="/tos" className={styles.TC}>
            Terms of Service
          </Link>
          and
          <Link href="/privacy" className={styles.TC}>
            Privacy Policy.
          </Link>
        </p>
        <p className={styles.AldAcc} onClick={handleGoToLogin}>
          Already have an account?
          <span className={`${styles.TC} ${styles.loginTC}`}> Login </span>
        </p>
      </div>
    </>
  );
};

export default AuthOptions;
