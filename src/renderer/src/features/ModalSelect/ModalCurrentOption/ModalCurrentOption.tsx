import { GridTemplate } from "../../../components/GridTemplate";
import { StandardText } from "../../../components/StandardText";
import { userVariant } from "./variants/userVariant";
import { bookVariant } from "./variants/bookVariant";
import {
  LIST_VARIANTS,
  TListVariants,
} from "../../../shared/constants/listVariants";
import { IUserData } from "../../../shared/constants/queryModels/user.model";
import { IBookData } from "../../../shared/constants/queryModels/book.model";
import { StyledButton, StyledContainer } from "./ModalCurrentOption.style";

const ModalCurrentOption = ({
  handleOpen,
  variant,
  values,
}: {
  handleOpen: () => void;
  variant: TListVariants;
  values: IUserData | IBookData | {};
}) => {
  const variantsTemplates: any = {
    [LIST_VARIANTS.USER]: userVariant,
    [LIST_VARIANTS.BOOK]: bookVariant,
  };
  return (
    <StyledContainer>
      <StandardText
        value={variantsTemplates[variant](values).header}
        align="center"
      />
      <GridTemplate {...variantsTemplates[variant](values)} />
      <StyledButton onClick={handleOpen} variant="outlined">
        {Object.keys(values).length !== 0 ? "Wybierz inną opcję" : "Wybierz"}
      </StyledButton>
    </StyledContainer>
  );
};

export { ModalCurrentOption };
