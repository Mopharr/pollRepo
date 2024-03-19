import { createContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type Props = {
  children: React.ReactNode;
};

const AxiosPrivateContext = createContext({});

const AxiosPrivateProvider = ({ children }: Props) => {
  useAxiosPrivate();
  return (
    <AxiosPrivateContext.Provider value={{}}>
      {children}
    </AxiosPrivateContext.Provider>
  );
};

export default AxiosPrivateProvider;
