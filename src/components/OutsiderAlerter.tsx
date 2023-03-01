import { useEffect, useRef } from "react";

type Props = {
  setFalse: (arg: boolean) => void;
  children: React.ReactNode;
};

function useOutsiderAlerter(
  ref: React.MutableRefObject<any>,
  setFalse: (arg: boolean) => void
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFalse(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setFalse]);
}

const OutsiderAlerter = ({
  children,
  setFalse,
  ...props
}: Props): JSX.Element => {
  const wrapperRef = useRef(null);
  useOutsiderAlerter(wrapperRef, setFalse);

  return (
    <div ref={wrapperRef} {...props}>
      {children}
    </div>
  );
};

export default OutsiderAlerter;
