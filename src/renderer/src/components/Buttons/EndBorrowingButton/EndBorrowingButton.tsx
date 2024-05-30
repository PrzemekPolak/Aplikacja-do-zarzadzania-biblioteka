import { useFetcher } from "react-router-dom";
import { StandardText } from "../../StandardText";
import { StyledButton, StyledButtonContainer } from "./EndBorrowingButton.style";
import { IEndBorrowingButtonProps } from "./EndBorrowingButton.model";
import { useAlert } from "@renderer/src/shared/hooks/useAlert";

const EndBorrowingButton = ({ date, entryId }: IEndBorrowingButtonProps) => {
  const fetcher = useFetcher();
  useAlert(fetcher);
  return (
    <>
      {date || fetcher.data?.state?.success ? (
        <StandardText value={date ? date : new Date().toLocaleDateString("pl")} align="center" />
      ) : (
        <StyledButtonContainer>
          <StyledButton
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              fetcher.submit(
                {},
                {
                  method: "post",
                  action: `/fastEndBorrowing/${entryId}`,
                }
              );
            }}
          >
            Zakończ wypożyczenie
          </StyledButton>
        </StyledButtonContainer>
      )}
    </>
  );
};

export { EndBorrowingButton };
