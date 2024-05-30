import { Card } from "@mui/material";
import { styled } from "@mui/system";

const StyledListContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  user-select: none;
`;

const StyledListElement = styled(Card, {
  shouldForwardProp: (prop: any) => !prop.startsWith("$"),
})<any>`
  height: 60px;
  padding: 8px;
  ${({ $additionalStyles }) =>
    $additionalStyles?.isBorrowedBackground ? "background-color: #EEEEEE;" : ""}
`;

export { StyledListContainer, StyledListElement };
