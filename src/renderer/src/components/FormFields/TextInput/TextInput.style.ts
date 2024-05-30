import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const StyledtextField = styled(TextField)`
  width: 100%;
  & .MuiFormLabel-asterisk {
    color: red;
  }
`;

export { StyledtextField };
