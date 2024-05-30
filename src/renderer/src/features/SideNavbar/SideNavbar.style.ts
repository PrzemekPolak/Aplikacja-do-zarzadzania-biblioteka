import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const StyledNavbar = styled("div")`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #EEEEEE;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-right: solid #DAD7D7 1px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  -webkit-box-shadow: 4px 4px 20px -15px rgba(66, 68, 90, 1);
  -moz-box-shadow: 4px 4px 20px -15px rgba(66, 68, 90, 1);
  box-shadow: 4px 4px 20px -15px rgba(66, 68, 90, 1);
`;

const StyledNavTitle = styled("div")`
  font-size: 24px;
  font-weight: 600;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export { StyledNavbar, StyledLink, StyledNavTitle };
