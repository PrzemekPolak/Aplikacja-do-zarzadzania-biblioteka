import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButtonContainer = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
`;

export { StyledButtonContainer, StyledButton };
