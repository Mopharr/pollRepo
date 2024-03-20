import { useState, FormEvent, ChangeEvent } from "react";
import { handlePublicRequest } from "@/utils/http";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import styles from "@/styles/forgot.module.css";
import { UserAuth } from "@/context/AuthContext";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineErrorOutline } from "react-icons/md";
import ToolTip from "@/components/ToolTip/ToolTip";

export type Data = {
  detail: string;
};

type Payload = {
  email: string;
};

const ForgotPassword = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { sessionId } = UserAuth();

  const notify = useNotify();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log(handlePublicRequest)
    try {
      const data = (await handlePublicRequest<Payload>(
        "post",
        "/auth/password/reset/",
        {
          email,
        }
      )) as Data;

      setMessage(data?.detail);
      setEmail("");
      setTimeout(() => {
        router.push("/");
      });
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

      setError(error?.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.bgContainer}>
        {/* {message && <ToolTip message={message} status="success" />}
        {error && <ToolTip message={error} status="error" />} */}
        <div className={styles.container}>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <button
              disabled={isSubmitting}
              className={styles.button}
              style={{
                backgroundColor: message ? "#52b963" : "#ff4105",
              }}
            >
              {isSubmitting ? (
                "Loading..."
              ) : message ? (
                <>
                  Email Sent <IoMdCheckmarkCircleOutline />
                </>
              ) : error ? (
                <>
                  Error Occur <MdOutlineErrorOutline />
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
