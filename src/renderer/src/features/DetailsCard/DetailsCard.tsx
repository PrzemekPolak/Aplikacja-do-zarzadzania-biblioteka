import { GridTemplate } from "../../components/GridTemplate";
import { LIST_VARIANTS } from "../../shared/constants/listVariants";
import { userDetailsCard } from "./variants/userDetailsCard";
import { StyledCard } from "./DetailsCard.style";
import { bookDetailsCard } from "./variants/bookDetailsCard";
import { IDetailsCardProps } from "./DetailsCard.model";

const DetailsCard = ({ variant, data }: IDetailsCardProps) => {
  const detailsVariants: any = {
    [LIST_VARIANTS.USER]: userDetailsCard,
    [LIST_VARIANTS.BOOK]: bookDetailsCard,
  };
  return (
    <StyledCard>
      <GridTemplate {...detailsVariants[variant](data)} />
    </StyledCard>
  );
};

export { DetailsCard };
