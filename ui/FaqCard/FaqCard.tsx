import { type FC } from "react";
import { type Faq } from "../../constants/faq";
import { PiCaretUp, PiCaretDown } from "react-icons/pi";
import styles from "./faqcard.module.css";

type Props = {
  faq: Faq;
  onToggle: () => void;
  isActive: boolean;
};

const FaqCard: FC<Props> = ({ faq, onToggle, isActive }) => {
  return (
    <div className={styles.card}>
      <div className={styles.question} onClick={onToggle}>
        {faq.question}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {isActive ? <PiCaretUp /> : <PiCaretDown />}
        </button>
      </div>

      {isActive && (
        <div
          className={styles.answer}
          // ref={answerRef}
          // style={isActive ? { height: answerRef.current!.scrollHeight } : {}}
        >
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default FaqCard;
