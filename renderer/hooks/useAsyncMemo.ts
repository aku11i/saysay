import { DependencyList, useEffect, useState } from "react";

export const useAsyncMemo = <T>(
  callback: () => Promise<T>,
  deps: DependencyList
): T | undefined => {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    callback().then(setValue);
  }, deps);

  return value;
};
