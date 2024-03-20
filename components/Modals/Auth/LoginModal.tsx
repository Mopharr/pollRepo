import { type FC, useState, type ChangeEvent, FormEvent } from "react";
import { ModalWrapper } from "../../../ui";
import { UserAuth } from "../../../context/AuthContext";
import styles from "./login.module.css";
import Cancel  from "../../../asset/svg/cancle.svg";
import {
  validateEmail,
  validateGender as validateInput,
} from "../../../utils/validateInput";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { reachGoogle } from "../../../utils/reachGoogle";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import google from "../../../asset/image/google.png";
import Image from "next/image";


type Props = {
  show: boolean;
};

export type LoginFormData = {
  userId: string;
  password: string;
};

export type PayloadData = {
  username?: string;
  email?: string;
  password: string;
};

const LoginModal: FC<Props> = ({ show }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    userId: "",
    password: "",
  });
  const [errorData, setErrorData] = useState<LoginFormData>({
    userId: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState<string>("password");

  const {
    handleCloseLoginModal,
    handleShowAuthModal,
    loginIsLoading,
    handleLogin,
    loginError,
  } = UserAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoToSignUp = () => {
    handleCloseLoginModal();
    handleShowAuthModal();
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateInput(formData.userId)) {
      setErrorData((prevErrors) => ({
        ...prevErrors,
        userId: "Field can't be empty",
      }));
    }

    if (!validateInput(formData.password)) {
      setErrorData((prevErrors) => ({
        ...prevErrors,
        password: "password must not be empty",
      }));
    }

    if (!validateInput(formData.password) || !validateInput(formData.userId)) {
      return;
    }

    let payloadData: PayloadData;

    if (validateEmail(formData.userId)) {
      payloadData = {
        email: formData.userId,
        password: formData.password,
      };
    } else {
      payloadData = {
        username: formData.userId,
        password: formData.password,
      };
    }

    handleLogin(payloadData, setFormData, setErrorData);
  }

  if (!show) {
    return null;
  }
  return (
    <ModalWrapper onClose={handleCloseLoginModal}>
      <div className={styles.loginForm}>
        <Cancel onClick={handleCloseLoginModal} className={styles.cancel} />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className={styles.logInput}
              type="text"
              name="userId"
              id="userId"
              placeholder="Email or Username"
              value={formData.userId}
              onChange={handleInputChange}
              required
            />
            {errorData.userId && (
              <p className={styles.error}>{errorData.userId}</p>
            )}

            {loginError?.non_field_errors &&
              loginError?.non_field_errors?.map((error) => (
                <p key={error} className={styles.error}>
                  {error}
                </p>
              ))}
          </div>

          <div className={styles.passwordBox}>
            <div>
              <input
                className={styles.logInput}
                type={passwordType}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() =>
                  setPasswordType((prev) =>
                    prev === "password" ? "text" : "password"
                  )
                }
              >
                {passwordType === "password" ? <GoEye /> : <GoEyeClosed />}
              </button>
            </div>
            {errorData.password && (
              <p className={styles.error}>{errorData.password}</p>
            )}

            {loginError?.non_field_errors &&
              loginError?.non_field_errors?.map((error) => (
                <p key={error} className={styles.error}>
                  {error}
                </p>
              ))}
          </div>

          <button
            type="submit"
            disabled={loginIsLoading}
            className={`${styles.login} ${styles.button}`}
          >
            {loginIsLoading ? "Loading..." : "Login"}
          </button>

          <button
            type="button"
            className={styles.forgotPassword}
            onClick={() => {
              handleCloseLoginModal();
              navigate("/forgot-password");
            }}
          >
            Forgotten Password
          </button>

          <div className={styles.orBox}>
            <div className={styles.hr} />
            <span>Or</span>
            <div className={styles.hr} />
          </div>

          <button type="button" className={`${styles.apple} ${styles.button}`}>
            <FaApple size={28} />
            <span>Login with Apple</span>
          </button>

          <button
            type="button"
            className={`${styles.google} ${styles.button}`}
            onClick={reachGoogle}
          >
            <Image src={google} alt="" />
            <span>Login with Google</span>
          </button>

          <button
            type="button"
            className={`${styles.createAccount} ${styles.button}`}
            onClick={handleGoToSignUp}
          >
            Create Account
          </button>

          <p className={styles.signTC}>
            By signing up, I’ve read and agreed to the{" "}
            <Link to="/tos" className={styles.TC}>
              {" "}
              Terms of Service{" "}
            </Link>{" "}
            and
            <Link to="/privacy" className={styles.TC}>
              {" "}
              Privacy Policy.
            </Link>
          </p>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default LoginModal;
