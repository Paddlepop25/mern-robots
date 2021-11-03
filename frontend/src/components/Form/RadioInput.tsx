import React from 'react';
import { RadioInputStyled, LabelStyled } from './RadioInput.styles';

interface RadioInputProps {
  label: string;
  value: string | boolean;
  checked: string | boolean;
  setter: any;
  inline?: boolean;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  label,
  value,
  checked,
  setter,
}: RadioInputProps) => {
  return (
    <>
      <RadioInputStyled
        type='radio'
        checked={checked === value}
        onChange={() => setter(value)}
      />
      <LabelStyled>{label}</LabelStyled>
    </>
  );
};
