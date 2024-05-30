import {IAverageRatingProps} from "./Rating.model";
import {RatingStyledContainer, StyledRating} from "./Rating.style";
import {StandardText} from "../StandardText";
import {Rating as MuiRating} from "@mui/material";

const AverageRating = ({value}: IAverageRatingProps) => {

  return (
    <RatingStyledContainer>
      {null !== value ? <StyledRating>
        <StandardText
          value={"Średnia ocena czytelników"}
          align={"center"}
          sizeVariant={"body2"}
        />
        <div style={{display: "flex", gap: "8px"}}>
          <StandardText value={value.toString()} sizeVariant={"h5"} />
          <MuiRating
            size="large"
            defaultValue={value ?? undefined}
            precision={0.1}
            readOnly={true}
          />
        </div>
      </StyledRating>
        : <StandardText value={"Brak ocen od czytelników"} align={"center"} sizeVariant={"h6"} />
      }
    </RatingStyledContainer>
  );
}

export { AverageRating };
