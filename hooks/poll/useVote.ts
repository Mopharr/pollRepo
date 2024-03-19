import { useState } from "react";
import { axiosPrivate } from "../../library/axios";
import axios from "axios";

interface UseVoteReturn {
  vote: (pollId: string, choiceId: number) => Promise<void>;
  unVote: (pollId: string) => Promise<void>;
  isLoading: boolean;
  error: any;
  message: string;
}

export const useVote = (): UseVoteReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<string>("");

  const vote = async (pollId: string, choiceId: number) => {
    setIsLoading(true);
    try {
      const endpoint = `/votes/vote/${pollId}/${choiceId}/`;
      const response = await axiosPrivate.post(endpoint);
      console.log("Voting response:", response);
      setMessage(response.data.message);
      console.log("Sending request to URL:", endpoint);
    } catch (err) {
       
  
        setError(true);
      
  
    } finally {
      setIsLoading(false);
    }
  };

  const unVote = async (pollId: string) => {
    setIsLoading(true);
    try {
      const endpoint = `/votes/vote/${pollId}/0/`;
      const response = await axiosPrivate.post(endpoint);
      console.log("Unoting response:", response);
      setMessage(response.data.message);
      console.log("Sending request to URL:", endpoint);
    } catch (err) {
 
       
        setError(false);
    
    } finally {
      setIsLoading(false);
    }
  };

  return { vote, unVote, isLoading, error, message };
};
