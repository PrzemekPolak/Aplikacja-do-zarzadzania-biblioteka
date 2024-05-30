import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButtonContainer = styled("div")`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const StyledButton = styled(Button)`
  margin-left: 0;
  margin-right: auto;
`;

const StyledButtonFlex = styled(Button)`
  display: flex;
  margin: auto;
`;

export { StyledButtonContainer, StyledButton, StyledButtonFlex };
