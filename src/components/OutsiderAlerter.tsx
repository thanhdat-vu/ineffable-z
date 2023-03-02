import { useEffect, useRef } from "react";

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

type Props = {
  setFalse: (arg: boolean) => void;
  children: React.ReactNode;
  tabIndex?: number;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
};

const OutsiderAlerter = ({
  setFalse,
  children,
  tabIndex,
  onKeyDown,
  className,
  ...props
}: Props): JSX.Element => {
  const wrapperRef = useRef(null);
  useOutsiderAlerter(wrapperRef, setFalse);

  return (
    <div
      ref={wrapperRef}
      tabIndex={tabIndex}
      className={className}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </div>
  );
};

export default OutsiderAlerter;
