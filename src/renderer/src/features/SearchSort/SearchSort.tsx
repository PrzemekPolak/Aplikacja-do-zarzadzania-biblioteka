import { useReducer } from "react";
import { GridTemplate } from "../../components/GridTemplate";
import {
  IAllSearchSortState,
  ISearchSortProps,
  IAllSearchSortAction,
} from "./SearchSort.model";
import {
  LIST_VARIANTS,
  TVariantsImports,
} from "../../shared/constants/listVariants";
import { userSearchInputs } from "./variants/userSearchInputs";
import { bookSearchInputs } from "./variants/bookSearchInputs";
import { borrowedSearchInputs } from "./variants/borrowedSearchInputs";
import { StyledContainer } from "./SearchSort.style";
import { useEffectNoInitial } from "../../shared/hooks/useEffectNoInitial";

const SearchSort = ({ setSearchSortValues, variant }: ISearchSortProps) => {
  const [allSearchSort, dispatchNewSearch] = useReducer(
    (state: IAllSearchSortState, action: IAllSearchSortAction) => {
      return { ...state, [action.name]: action.payload };
    },
    {
      search: null,
    }
  );

  const inputVariants: TVariantsImports = {
    [LIST_VARIANTS.USER]: userSearchInputs,
    [LIST_VARIANTS.BOOK]: bookSearchInputs,
    [LIST_VARIANTS.BORROWED]: borrowedSearchInputs,
    [LIST_VARIANTS.USER_BORROWED]: borrowedSearchInputs,
    [LIST_VARIANTS.BOOK_BORROWED]: borrowedSearchInputs,
  };

  useEffectNoInitial(() => {
    setSearchSortValues(allSearchSort);
  }, [allSearchSort]);

  return (
    <>
      <StyledContainer>
        <GridTemplate {...inputVariants[variant](dispatchNewSearch)} />
      </StyledContainer>
    </>
  );
};

export { SearchSort };
