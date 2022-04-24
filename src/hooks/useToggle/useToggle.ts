import { useCallback, useState } from "react";

export function useToggle(initialValue: boolean = false) {
  const [isActive, setIsActive] = useState(initialValue);

  const onToggle = useCallback(
    () => setIsActive((prevIsActive) => !prevIsActive),
    []
  );
  const setOn = useCallback(() => setIsActive(true), []);
  const setOff = useCallback(() => setIsActive(false), []);
  const onReset = useCallback(() => setIsActive(initialValue), [initialValue]);

  return { isActive, onToggle, setOn, setOff, onReset };
}
