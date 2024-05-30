import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled("div")`
  min-height: 100px;
  padding: 8px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  min-width: 200px;
`;

export { StyledContainer, StyledButton };
