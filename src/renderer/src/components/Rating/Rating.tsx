import {IRatingProps} from "./Rating.model";
import {RatingStyledContainer, StyledRating} from "./Rating.style";
import {Rating as MuiRating} from "@mui/material";
import {StandardText} from "../StandardText";
import {useFetcher} from "react-router-dom";

const Rating = ({value, borrowingIdentity, inForm = false, isBorrowed}: IRatingProps) => {
  const fetcher = useFetcher();

  return (
      <RatingStyledContainer>
        <StyledRating>
          {inForm && <StandardText
            value={"Ocena czytelnika"}
            align={"center"}
          ></StandardText>}
          <MuiRating
            size="large"
            defaultValue={value ? value : undefined}
            readOnly={inForm}
            disabled={isBorrowed}
            onClick={(event) => event.stopPropagation()}
            onChange={(_event, newValue)=> {
            if (false === inForm) {
              fetcher.submit(
                {
                  rating: newValue,
                },
                {
                  method: "post",
                  action: `/rateBorrowing/${borrowingIdentity}`,
                }
              );
            }
          }}/>
        </StyledRating>
      </RatingStyledContainer>
    )
}

export { Rating };
