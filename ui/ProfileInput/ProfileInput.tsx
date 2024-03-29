import {
  useState,
  type FC,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from "react";
import ChevronDown from "@/public/asset/svg/ChevronDown.svg";
import styles from "./profileinput.module.css";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

type InputProps = {
  label: string;
  id: string;
  value: string;
  type: string;
  activeOption?: string;
  options?: string[];
  onSelectChange?: (option: string) => void;
  serverError?: [];
  clientError?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<"input">;

const ProfileInput: FC<InputProps> = ({
  label,
  value,
  onChange,
  id,
  type,
  activeOption,
  options,
  onSelectChange,
  serverError,
  clientError,
  ...rest
}) => {
  const [passwordVisible, setPasswordVisible] = useState<string>("password");
  return (
    <div className={styles.inputContainer}>
      {type === "selectOne" ? (
        <>
          <div style={{ cursor: "pointer" }} tabIndex={-1}>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}
            </label>
            <input
              value={value}
              type="text"
              style={{ pointerEvents: "none" }}
              {...rest}
              readOnly
            />
            <Image src={ChevronDown} className={styles.chevronDown} alt="" />
          </div>

          {serverError &&
            serverError?.map((error) => (
              <p key={error} className={styles.error}>
                {error}
              </p>
            ))}

          <ul className="dropdown">
            {options?.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelectChange && onSelectChange(option);
                }}
                tabIndex={0}
                className={`${activeOption === option ? styles.active : ""}`}
              >
                <span>{option}</span>
                {activeOption === option && <FaCheck />}
              </li>
            ))}
          </ul>
          <h1></h1>
        </>
      ) : type === "selectTwo" ? (
        <>
          <div style={{ cursor: "pointer" }} tabIndex={-1}>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}
            </label>
            <input
              value={value}
              type="text"
              // style={{ pointerEvents: "none" }}
              onChange={(e) => onChange && onChange(e)}
              {...rest}
            />
            <Image src={ChevronDown} className={styles.chevronDown} alt="" />
          </div>
          {serverError &&
            serverError?.map((error) => (
              <p key={error} className={styles.error}>
                {error}
              </p>
            ))}
          <ul className="dropdown">
            {options?.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelectChange && onSelectChange(option);
                }}
                tabIndex={0}
                className={`${activeOption === option ? styles.active : ""}`}
              >
                <span>{option}</span>
                {activeOption === option && <FaCheck />}
              </li>
            ))}
          </ul>
          <h1></h1>{" "}
        </>
      ) : type === "password" ? (
        <>
          <div>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}
            </label>
            <input
              value={value}
              type={passwordVisible}
              onChange={(e) => onChange && onChange(e)}
              {...rest}
            />

            <button
              type="button"
              className={styles.toggle}
              onClick={() =>
                setPasswordVisible((prev) =>
                  prev === "password" ? "text" : "password"
                )
              }
            >
              {passwordVisible === "password" ? <GoEye /> : <GoEyeClosed />}
            </button>
          </div>
          {clientError && <p className={styles.error}>{clientError}</p>}
          {serverError &&
            serverError?.map((error) => (
              <p key={error} className={styles.error}>
                {error}
              </p>
            ))}
          <h1></h1>{" "}
        </>
      ) : (
        <>
          <div>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}
            </label>
            <input
              value={value}
              type={type}
              onChange={(e) => onChange && onChange(e)}
              {...rest}
            />
          </div>
          {clientError && <p className={styles.error}>{clientError}</p>}
          {serverError &&
            serverError?.map((error) => (
              <p key={error} className={styles.error}>
                {error}
              </p>
            ))}
          <h1></h1>{" "}
        </>
      )}
    </div>
  );
};

export default ProfileInput;
