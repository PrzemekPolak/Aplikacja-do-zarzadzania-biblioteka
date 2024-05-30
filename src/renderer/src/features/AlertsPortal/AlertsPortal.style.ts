import { TransitionGroup } from "react-transition-group";
import { styled } from "@mui/system";

const StyledTransitionGroup = styled(TransitionGroup)`
  position: fixed;
  bottom: 16px;
  right: 32px;
  width: 350px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  gap: 8px;
`;

export { StyledTransitionGroup };
