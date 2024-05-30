import { ICheckboxFilterProps } from "./CheckboxFilter.model";
import { useEffect, useState } from "react";
import { StyledFormControlLabel, StyledCheckbox } from "./CheckboxFilter.style";

const CheckboxFilter = ({
  name,
  label,
  setValue,
  initialValue,
}: ICheckboxFilterProps) => {
  const [currentValue, setCurrentValue] = useState<boolean>(initialValue);
  useEffect(() => {
    setValue({ name: name, payload: currentValue });
  }, [currentValue]);
  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
          onChange={(event) => setCurrentValue(event.target.checked)}
        />
      }
      label={label}
    />
  );
};

export { CheckboxFilter };
