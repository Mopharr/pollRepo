import React, { CSSProperties, useEffect } from "react";
import styles from "./progress.module.css";
import { FaCircleCheck } from "react-icons/fa6"; // Corrected import path

interface ProgressBarProps {
  percentage: number;
  optionName: string;
  voteCount: number;
  pollId: any;
  selectedVote: boolean;
  votedChoice: any;
}

interface CustomCSSProperties extends CSSProperties {
  "--target-width": string; // Ensure this matches the CSS variable in your stylesheet
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  optionName,
  voteCount,
  selectedVote,
  votedChoice,
  pollId,
}) => {

  const truncatedOptionName = truncateText(optionName, 25);
  return (
    <>
      <div className={styles.proMainContainer}>
        <span className={styles.optionName}>
          {truncatedOptionName}
          {selectedVote || votedChoice.has(pollId) ? (
            <>
              <FaCircleCheck className={styles.votedIcon} />
            </>
          ) : null}
        </span>
        <div className={styles.progressBarContainer}>
          {percentage > 0 && (
            <div
              className={styles.progressBar}
              style={
                {
                  "--target-width": `${percentage}%`, // Corrected syntax for template literal
                } as CustomCSSProperties
              }
            ></div>
          )}
        </div>
        <span className={styles.voteCount}>
          {percentage.toFixed(0)}%
          <span className={styles.countDigit}>[ {voteCount} ]</span>
        </span>
      </div>
    </>
  );
};

export default ProgressBar;
