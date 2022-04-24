import { useEffect, useState } from "react";

interface IOptions {
  successDuration?: number;
}

export function useClipboard(
  text: string,
  options?: IOptions
): [boolean, () => Promise<void>] {
  const [isCopied, setIsCopied] = useState(false);
  const successDuration = options?.successDuration;

  useEffect(() => {
    if (isCopied && successDuration) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isCopied, successDuration]);

  return [
    isCopied,
    async () => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
      } catch {
        setIsCopied(false);
      }
    },
  ];
}
