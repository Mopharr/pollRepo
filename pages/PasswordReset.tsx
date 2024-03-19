import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import {
  validatePassword,
  validateSecondPassword,
} from "../utils/validateInput";
import { GoEye, GoEyeClosed } from "react-icons/go";
import styles from "../styles/passwordreset.module.css";
import { type Data } from "./ForgotPassword";
import { handlePublicRequest } from "../utils/http";
import useNotify from "../hooks/useNotify";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import ToolTip from "../components/ToolTip/ToolTip";

type FormData = {
  new_password1: string;
  new_password2: string;
};

type Payload = FormData & {
  uid?: string;
  token?: string;
};

const PasswordReset = () => {
  const notify = useNotify();
  const { sessionId, handleShowLoginModal } = UserAuth();
  const [passwordType, setPasswordType] = useState<string>("password");
  const [confirmPasswordType, setConfirmPasswordType] =
    useState<string>("password");
  const [formData, setFormData] = useState<FormData>({
    new_password1: "",
    new_password2: "",
  });

  const [formError, setFormError] = useState<FormData>({
    new_password1: "",
    new_password2: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string[]>([]);

  const { uid, token } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "new_password1") {
      setFormError((prev) => ({
        ...prev,
        new_password1: validatePassword(value)
          ? ""
          : "Password must contain at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character",
      }));
    } else if (name === "new_password2") {
      setFormError((prev) => ({
        ...prev,
        new_password2: validateSecondPassword(formData.new_password1, value)
          ? ""
          : "it must be the same with your new password",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword(formData.new_password1)) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        new_password1:
          "Password must contain at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character",
      }));
    }

    if (
      !validateSecondPassword(formData.new_password1, formData.new_password2)
    ) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        new_password2: "it must be the same with your new password",
      }));
    }

    if (
      !validatePassword(formData.new_password1) ||
      !validateSecondPassword(formData.new_password1, formData.new_password2)
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      const payLoad = {
        ...formData,
        uid: uid && uid,
        token: token && token,
      };

      const data = (await handlePublicRequest<Payload>(
        "post",
        "/auth/password/reset/confirm/",
        payLoad
      )) as Data;

      setFormData({
        new_password1: "",
        new_password2: "",
      });

      notify(data?.detail, "success", {
        toastId: sessionId,
      });

      handleShowLoginModal();
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error?.response?.data);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });

        return;
      }
      if (error?.response?.status === 404) {
        notify(
          "The requested resource was not found on this server.",
          "error",
          {
            toastId: sessionId,
          }
        );

        return;
      }

      const errorData = error?.response?.data;

      const allErrors = [
        ...(errorData?.uid ? errorData?.uid : []),
        ...(errorData?.new_password1 ? errorData?.new_password1 : []),
        ...(errorData?.new_password2 ? errorData?.new_password2 : []),
        ...(errorData?.token ? errorData?.token : []),
      ];
      setServerError(allErrors);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {serverError.length > 0 && (
        <ToolTip status="error" messageList={serverError} />
      )}
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <div>
              <input
                type={passwordType}
                name="new_password1"
                id="new_password1"
                placeholder="New password"
                value={formData.new_password1}
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

            {formError.new_password1 && (
              <p className={styles.error}>{formError.new_password1}</p>
            )}
          </div>

          <div className={styles.inputBox}>
            <div>
              <input
                type={confirmPasswordType}
                name="new_password2"
                id="new_password2"
                placeholder="Confirm new password"
                value={formData.new_password2}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() =>
                  setConfirmPasswordType((prev) =>
                    prev === "password" ? "text" : "password"
                  )
                }
              >
                {confirmPasswordType === "password" ? (
                  <GoEye />
                ) : (
                  <GoEyeClosed />
                )}
              </button>
            </div>
            {formError.new_password2 && (
              <p className={styles.error}>{formError.new_password2}</p>
            )}
          </div>

          <button disabled={isSubmitting} className={styles.button}>
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PasswordReset;
