import {StandardText} from "../../StandardText";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import {useFetcher} from "react-router-dom";
import {StyledButton, StyledButtonContainer} from "../Button.style";

const ExcludeRecommendationButton = ({bookIdentity}: {bookIdentity: number }) => {
  const fetcher = useFetcher();

  return (
    <StyledButtonContainer>
      <StyledButton
        variant="text"
        size={"small"}
        color={"error"}
        onClick={(e) => {
          e.stopPropagation();
          fetcher.submit({}, { method: "post", action: `recommendations/${bookIdentity}/exclude` });
        }}
      >
        <div style={{display: "flex", alignItems: "center", gap: "4px"}}>
            <NotInterestedIcon fontSize={"medium"}/>
            <StandardText align={"center"} value={"Nietrafiona"} sizeVariant={"body2"} />
          </div>
      </StyledButton>
    </StyledButtonContainer>
  );
}

export { ExcludeRecommendationButton };
