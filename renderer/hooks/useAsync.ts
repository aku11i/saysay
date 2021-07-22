import { useEffect, useState } from "react";

export const useAsync = <T>(callback: () => Promise<T>): T | undefined => {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    callback().then(setValue);
  }, []);

  return value;
};
