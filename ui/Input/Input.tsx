import {
  ChangeEvent,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";
import { ReactComponent as ChevronDown } from "../../asset/svg/ChevronDown.svg";
import { FaCheck } from "react-icons/fa";
import styles from "./input.module.css";
import { type Interest } from "../../constants/Interest";
import { GoEye, GoEyeClosed } from "react-icons/go";

type InputProps = {
  label: string;
  id: string;
  value: string;
  type: string;
  serverError?: [];
  clientError?: string;
  className?: string;
  activeOption?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  activeInterest?: number[];
  options?: Interest[];
  optionsTwo?: string[];
  compulsory?: boolean;
  onSelectChange?: (label: string, id: number) => void;
  onSelectOption?: (option: string) => void;
} & ComponentPropsWithoutRef<"input">;

const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  id,
  type,
  options,
  optionsTwo,
  activeOption,
  serverError,
  clientError,
  activeInterest,
  onSelectChange,
  onSelectOption,
  className,
  compulsory,
  ...rest
}) => {
  const [passwordVisible, setPasswordVisible] = useState<string>("password");
  return (
    <div
      className={`${styles.inputContainer} ${className && styles[className]}`}
    >
      {type === "selectOne" ? (
        <>
          <div style={{ cursor: "pointer" }} tabIndex={-1}>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}{" "}
              {compulsory && <span className={styles.compulsory}>*</span>}
            </label>
            <input
              value={value}
              type="text"
              style={{ pointerEvents: "none" }}
              {...rest}
              readOnly
            />

            <ChevronDown className={styles.chevronDown} />
          </div>

          {serverError &&
            serverError?.map((error) => (
              <p key={error} className={styles.error}>
                {error}
              </p>
            ))}

          <ul className="dropdown">
            {options?.map((option) => (
              <li
                key={option?.id}
                onClick={() => {
                  onSelectChange && onSelectChange(option?.label, option?.id);
                }}
                tabIndex={0}
                className={`${
                  activeInterest?.includes(option?.id) ? styles.active : ""
                }`}
              >
                <span>{option.label}</span>
                {activeInterest?.includes(option?.id) && <FaCheck />}
              </li>
            ))}
          </ul>
        </>
      ) : type === "selectTwo" ? (
        <>
          <div style={{ cursor: "pointer" }} tabIndex={-1}>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}{" "}
              {compulsory && <span className={styles.compulsory}>*</span>}
            </label>
            <input
              value={value}
              type="text"
              // style={{ pointerEvents: "none" }}
              onChange={(e) => onChange && onChange(e)}
              {...rest}
            />

            <ChevronDown className={styles.chevronDown} />
          </div>
          {clientError && <p className={styles.error}>{clientError}</p>}
          {serverError &&
            serverError?.map((error) => (
              <p key={error} className={styles.error}>
                {error}
              </p>
            ))}

          <ul className="dropdown">
            {optionsTwo?.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelectOption && onSelectOption(option);
                }}
                tabIndex={0}
                className={`${activeOption === option ? styles.active : ""}`}
              >
                <span>{option}</span>
                {activeOption === option && <FaCheck />}
              </li>
            ))}
          </ul>
        </>
      ) : type === "selectThree" ? (
        <>
          <div style={{ cursor: "pointer" }} tabIndex={-1}>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}{" "}
              {compulsory && <span className={styles.compulsory}>*</span>}
            </label>
            <input
              value={value}
              type="text"
              style={{ pointerEvents: "none" }}
              readOnly
              {...rest}
            />

            <ChevronDown className={styles.chevronDown} />
          </div>

          {clientError && <p className={styles.error}>{clientError}</p>}
          {serverError &&
            serverError?.map((error) => (
              <p key={error} className={styles.error}>
                {error}
              </p>
            ))}

          <ul className="dropdown">
            {optionsTwo?.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelectOption && onSelectOption(option);
                }}
                tabIndex={0}
                className={`${activeOption === option ? styles.active : ""}`}
              >
                <span>{option}</span>
                {activeOption === option && <FaCheck />}
              </li>
            ))}
          </ul>
        </>
      ) : type === "password" ? (
        <>
          <div>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}{" "}
              {compulsory && <span className={styles.compulsory}>*</span>}
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
        </>
      ) : (
        <>
          <div>
            <label htmlFor={id} className={`${value ? styles.active : ""}`}>
              {label}{" "}
              {compulsory && <span className={styles.compulsory}>*</span>}
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
        </>
      )}
    </div>
  );
};

export default Input;
