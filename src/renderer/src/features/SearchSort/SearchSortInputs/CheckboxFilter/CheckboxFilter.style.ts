import { styled } from "@mui/system";
import { Checkbox, FormControlLabel } from "@mui/material";

const StyledFormControlLabel = styled(FormControlLabel)`
  height: 100%;
`;

const StyledCheckbox = styled(Checkbox)`
  & .MuiSvgIcon-root {
    font-size: 28px;
  }
`;

export { StyledFormControlLabel, StyledCheckbox };
