import { styled } from "@mui/system";

const StyledContainer = styled("div")`
  display: flex;
  height: 100%;
`;

const StyledLabel = styled("div")`
  width: 200px;
  line-height: 56px !important;
  font: inherit;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
  margin-left: auto;
  margin-right: 16px;
`;

const StyledButton = styled("button")`
  cursor: pointer;
  padding: 5px 15px;
  border: 0;
  border-radius: 4px;
  border: solid 1px rgba(25, 118, 210, 0.5);
  background-color: #fff;
  font: inherit;
  color: black;
  width: 150px;
  height: 40px;
  padding-right: 32px;
`;

export { StyledContainer, StyledLabel, StyledButton };
