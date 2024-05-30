import { TListVariants } from "../../shared/constants/listVariants";
import { TOrderOptions } from "./SearchSortInputs/OrderBySelect/OrderBySelect.model";
import { TSortingDirections } from "./SearchSortInputs/SortingDirection/SortingDirection.model";

interface ISearchSortProps {
  setSearchSortValues: any;
  variant: TListVariants;
}

interface IAllSearchSortState {
  search: string | null;
  sortDirection?: TSortingDirections;
  orderBy?: TOrderOptions;
  borrowedOnly?: boolean;
}

interface IAllSearchSortAction {
  name: string;
  payload: string | boolean | null | undefined;
}

export type { ISearchSortProps, IAllSearchSortState, IAllSearchSortAction };
