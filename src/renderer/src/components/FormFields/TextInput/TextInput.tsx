import {Field, FieldProps, FormikValues, useFormikContext} from "formik";
import { StyledtextField } from "./TextInput.style";
import { ITextInputProps } from "./TextInput.model";

const TextInput = ({ name, label, required = false }: ITextInputProps) => {
  const { errors } = useFormikContext<FormikValues>();
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string>) => (
        <StyledtextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={field.value ?? undefined}
          onChange={(event) => form.setFieldValue(name, event.target.value)}
          error={errors[name] ? true : false}
          helperText={errors[name] ? (errors[name] as String) : " "}
          required={required}
        />
      )}
    </Field>
  );
};

export { TextInput };
