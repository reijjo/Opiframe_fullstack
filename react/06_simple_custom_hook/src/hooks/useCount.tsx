import { useState } from "react";

const useCount = (initialValue = 0): [number, () => void, () => void] => {
  const [value, setValue] = useState(initialValue);

  const add = () => {
    setValue((value) => value + 1);
  };

  const substract = () => {
    setValue((value) => value - 1);
  };

  return [value, add, substract];
};

export default useCount;
