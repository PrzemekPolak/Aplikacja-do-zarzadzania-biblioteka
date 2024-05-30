import { ILinkButtonProps } from "./LinkButton.model";
import { StyledLink } from "./LinkButton.style";
import {StyledButtonFlex} from "../Button.style";

const LinkButton = ({ label, link }: ILinkButtonProps) => {
  return (
    <StyledLink to={link}>
      <StyledButtonFlex variant="outlined">{label}</StyledButtonFlex>
    </StyledLink>
  );
};

export { LinkButton };
