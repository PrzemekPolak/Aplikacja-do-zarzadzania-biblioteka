import { Pagination } from "@mui/material";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";

const StyledContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledPagination = styled(Pagination)`
  align-self: center;
`;

const StyledPaginationContainer = styled("div")`
  align-self: center;
  display: flex;
  gap: 16px;
`;

const StyledGoToPage = styled(TextField)`
  width: 150px;
`;

export {
  StyledContainer,
  StyledPagination,
  StyledPaginationContainer,
  StyledGoToPage,
};
