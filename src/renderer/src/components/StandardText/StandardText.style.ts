import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledTextContainer = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  width: 100%;
`;

const StyledLabelTypography = styled(Typography)`
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

export {
  StyledContainer,
  StyledTextContainer,
  StyledTypography,
  StyledLabelTypography,
};
