import { userRowConfig } from "./variants/userRowConfig";
import { borrowedRowConfig } from "./variants/borrowedRowConfig";
import { bookRowConfig } from "./variants/bookRowConfig";
import {
  LIST_VARIANTS,
  TVariantsImports,
} from "../../shared/constants/listVariants";
import { GridTemplate } from "../../components/GridTemplate";
import { userBorrowedConfig } from "./variants/userBorrowedConfig";
import { ITemplatedListProps, TAllListData } from "./TemplatedList.model";
import { StyledListContainer, StyledListElement } from "./TemplatedList.style";
import { StandardText } from "../../components/StandardText";
import { bookBorrowedConfig } from "./variants/bookBorrowedConfig";

const TemplatedList = ({listData, variant, onElementClick = () => {}}: ITemplatedListProps) => {
  const elementType: TVariantsImports = {
    [LIST_VARIANTS.USER]: userRowConfig,
    [LIST_VARIANTS.BORROWED]: borrowedRowConfig,
    [LIST_VARIANTS.BOOK]: bookRowConfig,
    [LIST_VARIANTS.USER_BORROWED]: userBorrowedConfig,
    [LIST_VARIANTS.BOOK_BORROWED]: bookBorrowedConfig,
  };
  return (
    <StyledListContainer>
      {listData?.length ? (
        listData.map((listObj: TAllListData, index: number) => {
          return (
            <StyledListElement
              key={listObj.id}
              onClick={() => onElementClick(listObj)}
              $additionalStyles={elementType[variant](listObj, index).additionalStyles}
            >
              <GridTemplate
                items={elementType[variant](listObj, index).items}
                template={elementType[variant](listObj, index).template}
              />
            </StyledListElement>
          );
        })
      ) : (
        <StandardText value={"Brak danych"} align="center" sizeVariant="h5" />
      )}
    </StyledListContainer>
  );
};

export { TemplatedList };
