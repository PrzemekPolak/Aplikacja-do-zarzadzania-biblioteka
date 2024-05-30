import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { IDeleteButtonProps } from "./DeleteButton.model";
import { useAlert } from "@renderer/src/shared/hooks/useAlert";
import {StyledButtonFlex} from "../Button.style";

const DeleteButton = ({ dbTable, entryId, navLink = "" }: IDeleteButtonProps) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  useAlert(fetcher, () => {
    if (navLink) navigate(navLink);
  });

  if (useLocation().pathname.includes("add")) return <></>;
  return (
    <StyledButtonFlex
      variant="text"
      onClick={(e) => {
        e.stopPropagation();
        fetcher.submit(
          {},
          {
            method: "delete",
            action: ["/deleteRecord", dbTable, entryId].join("/"),
          }
        );
      }}
    >
      <DeleteForeverIcon color="error" />
    </StyledButtonFlex>
  );
};

export { DeleteButton };
