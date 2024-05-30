import { Button } from "@mui/material";
import { useState } from "react";
import { StyledContainer } from "./MissingBookIds.style";
import { useFetcher } from "react-router-dom";
import { useAlert } from "@renderer/src/shared/hooks/useAlert";

const MissingBookIds = () => {
  const [missingBookIdsVisible, setMissingBookIdsVisible] = useState<boolean>(false);
  const fetcher = useFetcher();
  const missingListText: string =
    fetcher.data?.missingNumber > 0
      ? `Brakujące identyfikatory: ${fetcher.data.listData.slice(0, 100).join(", ")}${
          fetcher.data.missingNumber > 100
            ? `, ... [ ${fetcher.data.missingNumber - 100} więcej ]`
            : ""
        }`
      : "Nie ma brakujących identyfikatorów książek";
  useAlert(fetcher);

  return (
    <StyledContainer>
      <Button
        variant="outlined"
        onClick={async () => {
          if (missingBookIdsVisible) setMissingBookIdsVisible(false);
          else {
            fetcher.submit({}, { method: "post", action: "/getMissingBookIds" });
            setMissingBookIdsVisible(true);
          }
        }}
      >
        {missingBookIdsVisible
          ? "Schowaj brakujące identyfikatory książek"
          : "Pokaż brakujące identyfikatory książek"}
      </Button>
      <div>{missingBookIdsVisible ? missingListText : ""}</div>
    </StyledContainer>
  );
};

export { MissingBookIds };
