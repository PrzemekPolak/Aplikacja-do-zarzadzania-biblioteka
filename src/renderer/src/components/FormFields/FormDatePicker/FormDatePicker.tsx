import { forwardRef } from "react";
import {Field, FieldProps} from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pl } from "date-fns/esm/locale";
import {
  StyledButton,
  StyledContainer,
  StyledLabel,
} from "./FormDatePicker.style";
import { IFormDatePickerProps } from "./FormDatePicker.model";

const FormDatePicker = ({ name, label }: IFormDatePickerProps) => {
  registerLocale("pl", pl);

  const CustomInputButton = forwardRef<any, { value?: any; onClick?: any }>(
    ({ value, onClick }, ref: any) => (
      <StyledButton type="button" onClick={onClick} ref={ref}>
        {value}
      </StyledButton>
    )
  );

  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <Field name={name}>
        {({ field, form }: FieldProps<number>) => (
          // @ts-ignore
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            locale={"pl"}
            dateFormat="dd.MM.yyyy"
            onChange={(date) =>
              form.setFieldValue(name, date ? date.getTime() : null)
            }
            customInput={<CustomInputButton />}
            wrapperClassName={"date-picker-style"}
            isClearable
          />
        )}
      </Field>
    </StyledContainer>
  );
};

export { FormDatePicker };
