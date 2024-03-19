import { ReactComponent as NotificationCheckmark } from "../../asset/svg/NotificationCheckmark.svg";
import { ReactComponent as NotificationCoolEmote } from "../../asset/svg/NotificationCoolEmote.svg";
import { ReactComponent as NotificationInfo } from "../../asset/svg/NotificationInfo.svg";
import styles from "./notification.module.css";

type NotificationProp = {
  status?: "info" | "success" | "error";
  message: string;
};

const Notification = ({ status = "info", message }: NotificationProp) => {
  return (
    <div
      className={`${styles.container} ${
        status === "success" && styles.success
      } ${status === "error" && styles.error}`}
    >
      {status === "success" ? (
        <NotificationCheckmark />
      ) : status === "error" ? (
        <NotificationInfo />
      ) : (
        <NotificationCoolEmote />
      )}
      <p>{message}</p>
    </div>
  );
};

export default Notification;
