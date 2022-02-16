import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

interface IDebounceTextField {
  type?: string;
  initialValue?: string;
  inputDelay?: number;
  placeholder?: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const TextFieldWithDebounce: React.FC<IDebounceTextField> = ({
  type = 'text',
  initialValue = '',
  inputDelay = 300,
  placeholder = '',
  setInput,
}) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInput(value);
    }, inputDelay);
    return () => clearTimeout(timer);
  }, [value, inputDelay, setInput]);

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    setValue(event.target.value);
  }

  const theValue = value;

  return (
    <TextField
      type={type}
      value={theValue}
      placeholder={placeholder}
      onChange={(event) => handleChange(event)}
    />
  );
};
