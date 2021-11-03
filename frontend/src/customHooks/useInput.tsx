import React, { useState } from 'react';

interface ValidateValueFunction {
  value: (input: string) => any;
}

export const useInput = (validateValue: (arg0: string) => any) => {
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

  const resetForm = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    onValueChangeHandler,
    onValueBlurHandler,
    resetForm,
  };
};
