import React, { useState } from 'react';

type ValidateValueFunction = (input: string) => boolean;

// export const useInput = (validateValue: (arg0: any) => any) => {
export const useInput = (validateValue: ValidateValueFunction) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const onValueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEnteredValue(event.target.value);
  };

  const onValueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    onValueChangeHandler,
    onValueBlurHandler,
    reset,
  };
};
