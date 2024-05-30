import { useFormikContext } from "formik";
import { StyledButton } from "./SubmitButton.style";

const SubmitButton = () => {
  const { dirty, isValid } = useFormikContext();
  return (
    <StyledButton
      type="submit"
      variant="outlined"
      disabled={!(isValid && dirty)}
    >
      Zapisz
    </StyledButton>
  );
};

export { SubmitButton };
