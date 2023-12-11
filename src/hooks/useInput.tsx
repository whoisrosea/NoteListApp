import { useState } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState(initialValue.trim() === "");

  const tagRegex = /#(\w+)/g;

  const onChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setTags(inputValue.match(tagRegex) || []);

    const inputIsEmpty = inputValue.trim() === "";
    setError(inputIsEmpty);
  };


  return {
    value,
    tags,
    error,
    onChange,
    setValue
  };
};
