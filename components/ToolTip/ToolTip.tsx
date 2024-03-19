import styles from "./tooltip.module.css";

type ForgotProps = {
  status: "error" | "success";
  message: string;
};

type ResetProps = {
  status: "error" | "success";
  messageList: string[];
};

type Props = ForgotProps | ResetProps;

function isResetProps(props: ForgotProps | ResetProps): props is ResetProps {
  return "messageList" in props;
}

const ToolTip = (props: Props) => {
  if (isResetProps(props)) {
    const { status, messageList } = props;

    return (
      <div
        className={`${styles.card} ${
          status === "success" ? styles.success : styles.error
        }`}
      >
        <ul>
          {messageList.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>
    );
  }

  const { status, message } = props;

  return (
    <div
      className={`${styles.card} ${
        status === "success" ? styles.success : styles.error
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default ToolTip;
