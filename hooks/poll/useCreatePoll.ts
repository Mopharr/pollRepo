import { useState } from "react";
import { PollRequest, PollResponse } from "../../types/createPolls.type";
import { axiosPrivate } from "../../library/axios";

// Define a type for the expected error structure
interface ErrorResponse {
  status_code: number;
  Poll: { [key: string]: string[] };
}

// Type guard to check if a given object matches the ErrorResponse interface
function isErrorWithPoll(data: any): data is ErrorResponse {
  return (
    data &&
    typeof data === "object" &&
    "Poll" in data &&
    typeof data.Poll === "object"
  );
}

const useSubmitPoll = () => {
  const [data, setData] = useState<PollResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const submitPoll = async (pollData: PollRequest) => {
    setLoading(true);
    console.log(JSON.stringify(pollData, null, 2));

    try {
      const response = await axiosPrivate.post<PollResponse>(
        "/polls/polls/",
        pollData
      );
      setData(response.data);
      setLoading(false);
      setError("");
      console.log("Poll creation successful:", response.data);
    } catch (err: any) {
      console.log("Poll creation error response:", err.response);
      setLoading(false);
      if (err.response && isErrorWithPoll(err.response.data)) {
        // Extracting and formatting errors from the backend
        const errors = err.response.data.Poll;
        const formattedErrors = Object.entries(errors)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`
          )
          .join("; ");
        setError(`Error: ${formattedErrors}`);
      } else {
        // Fallback error message
        setError("An unexpected error occurred while submitting the poll.");
      }
    }
  };

  return { submitPoll, data, loading, error };
};

export default useSubmitPoll;
