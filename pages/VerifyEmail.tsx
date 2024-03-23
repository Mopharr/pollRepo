import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { handlePublicRequest } from "../utils/http";
import RedCross from "../asset/svg/RedCross.svg";
import GreenCheck from "../asset/svg/GreenCheck.svg";
import styles from "../styles/verifyemail.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isNetworkError, setIsNetworkError] = useState<boolean>(false);
  const [tryAgain, setTryAgain] = useState<boolean>(false);

  const router = useRouter();

  const { query } = router;
  const key = query.key;

  useEffect(() => {
    async function handleVerifyEmail() {
      setErrorMessage("");
      setIsNetworkError(false);
      setIsLoading(true);

      try {
        const keys = Array.isArray(key) ? key : [key];
        const firstKey = keys.length > 0 ? keys[0] : undefined;
        const data = (await handlePublicRequest<{ key: string }>(
          "post",
          "/auth/registration/verify-email/",
          {
            key: firstKey!,
          }
        )) as any;

        console.log(data);
        setSuccessMessage("Verified email successfully");
        setErrorMessage("");
        setIsNetworkError(false);
      } catch (error: any) {
        console.log(error?.response?.data);
        if (!error?.response) {
          setErrorMessage("Check your internet connection");
          setIsNetworkError(true);
        }
        if (error?.response?.status === 404) {
          setErrorMessage("Email not found");
        }
      } finally {
        setIsLoading(false);
        setTryAgain(false);
      }
    }

    if (key || tryAgain) {
      handleVerifyEmail();
    }
  }, [key, tryAgain]);

  return (
    <div
      className={`${styles.container} ${
        successMessage ? styles.success : errorMessage ? styles.error : ""
      }`}
    >
      <div className={styles.svgBox}>
        {successMessage && <Image alt="" src={GreenCheck} />}
        {errorMessage && <Image alt="" src={RedCross} />}

        {isLoading && (
          <div className={styles["lds-default"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      <div className={styles.messageBox}>
        {isLoading && (
          <>
            <h6>Verifying....</h6>
            <p>Please wait 🙏</p>
          </>
        )}

        {successMessage && (
          <>
            <h6>Success!</h6>
            <p>{successMessage}</p>
          </>
        )}

        {errorMessage && (
          <>
            {" "}
            <h6>Error!</h6>
            <p>{errorMessage}</p>
          </>
        )}
      </div>

      {!isNetworkError && !isLoading && (
        <button
          className={`${styles.button} ${
            successMessage
              ? styles.successBtn
              : errorMessage
              ? styles.errorBtn
              : ""
          }`}
          onClick={() => router.push("/")}
        >
          Go home
        </button>
      )}

      {isNetworkError && (
        <button
          className={styles.tryAgainBtn}
          onClick={() => setTryAgain(true)}
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
