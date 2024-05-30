import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  ISortingDirectionProps,
  SORTING_DIRECTIONS,
  TSortingDirections,
} from "./SortingDirection.model";
import { StyledButton, StyledContainer } from "./SortingDirection.style";

const SortingDirection = ({
  name,
  initialValue = SORTING_DIRECTIONS.ASC,
  setDirection,
}: ISortingDirectionProps) => {
  const [currentValue, setCurrentValue] =
    useState<TSortingDirections>(initialValue);

  useEffect(() => {
    setDirection({ name: name, payload: currentValue });
  }, [currentValue]);

  const ArrowComp =
    currentValue === SORTING_DIRECTIONS.ASC
      ? ArrowCircleUpIcon
      : ArrowCircleDownIcon;
  return (
    <StyledContainer>
      <StyledButton
        onClick={() => {
          setCurrentValue(
            currentValue === SORTING_DIRECTIONS.ASC
              ? SORTING_DIRECTIONS.DESC
              : SORTING_DIRECTIONS.ASC
          );
        }}
      >
        {<ArrowComp fontSize="large" />}
      </StyledButton>
    </StyledContainer>
  );
};

export { SortingDirection };
