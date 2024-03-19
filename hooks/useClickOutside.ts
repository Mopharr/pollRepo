import { useEffect } from "react";

type Props = {
  elementRef: React.RefObject<HTMLDivElement>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  stateValue: boolean;
};

const useClickOutside = ({ elementRef, setState, stateValue }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        elementRef.current &&
        !elementRef.current!.contains(event.target as Node) &&
        stateValue === true
      ) {
        setState(false);
        // event.stopPropagation();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [elementRef, setState, stateValue]);

  return null;
};

export default useClickOutside;
