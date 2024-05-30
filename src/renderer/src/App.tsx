import { Outlet } from "react-router-dom";
import { styled } from "@mui/system";
import { SideNavbar } from "./features/SideNavbar";
import { AlertsPortal } from "./features/AlertsPortal";

const StyledAppContainer = styled("div")`
  display: grid;
  grid-template-columns: 2fr 10fr;
`;

function App() {
  return (
    <StyledAppContainer>
      <SideNavbar />
      <Outlet />
      <AlertsPortal />
    </StyledAppContainer>
  );
}

export default App;
