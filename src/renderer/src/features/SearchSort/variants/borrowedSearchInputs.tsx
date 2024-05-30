import { IAllSearchSortAction } from "../SearchSort.model";
import { CheckboxFilter } from "../SearchSortInputs/CheckboxFilter";
import { OrderBySelect } from "../SearchSortInputs/OrderBySelect";
import { ORDER_OPTIONS } from "../SearchSortInputs/OrderBySelect/OrderBySelect.model";
import { SearchBar } from "../SearchSortInputs/SearchBar";
import { SortingDirection } from "../SearchSortInputs/SortingDirection";
import { SORTING_DIRECTIONS } from "../SearchSortInputs/SortingDirection/SortingDirection.model";

const borrowedSearchInputs = (
  dispatchNewSearch: React.Dispatch<IAllSearchSortAction>
) => {
  return {
    template: [
      "search search search orderBy orderBy sortDirection borrowedOnly borrowedOnly borrowedOnly",
    ],
    items: [
      {
        name: "search",
        label: "Szukaj wypożyczeń",
        setCurrentSearch: dispatchNewSearch,
        component: SearchBar,
      },
      {
        name: "sortDirection",
        setDirection: dispatchNewSearch,
        initialValue: SORTING_DIRECTIONS.DESC,
        component: SortingDirection,
      },
      {
        name: "orderBy",
        orderOptions: [
          ORDER_OPTIONS.BORROWED_DATE,
          ORDER_OPTIONS.RETURNED_DATE,
          ORDER_OPTIONS.ID,
        ],
        setOrderType: dispatchNewSearch,
        initialValue: ORDER_OPTIONS.BORROWED_DATE,
        component: OrderBySelect,
      },
      {
        name: "borrowedOnly",
        label: "Wyświetl tylko aktywne wypożyczenia",
        setValue: dispatchNewSearch,
        initialValue: false,
        component: CheckboxFilter,
      },
    ],
  };
};

export { borrowedSearchInputs };
