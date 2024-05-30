import {IShowMoreButtonProps} from "./ShowMoreButton.model";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import {StandardText} from "../../StandardText";
import {StyledButton, StyledButtonContainer} from "../Button.style";

const ShowMoreButton = ({currentState, changeState}: IShowMoreButtonProps) => {

  return (
    <StyledButtonContainer>
      <StyledButton
        variant="text"
        onClick={(e) => {
          e.stopPropagation();
          changeState(!currentState);
        }}
      >
        {currentState
          ? <div style={{display: "flex", alignItems: "center"}}>
            <KeyboardDoubleArrowUpIcon fontSize={"large"}/>
            <StandardText value={"Ukryj rekomendacje"} />
          </div>
          : <div style={{display: "flex", alignItems: "center"}}>
            <KeyboardDoubleArrowDownIcon fontSize={"large"}/>
            <StandardText value={"Pokaż rekomendacje"} />
          </div>}
      </StyledButton>
    </StyledButtonContainer>
  );
}

export { ShowMoreButton };
