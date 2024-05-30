import { IAllSearchSortAction } from "../SearchSort.model";
import { CheckboxFilter } from "../SearchSortInputs/CheckboxFilter";
import { OrderBySelect } from "../SearchSortInputs/OrderBySelect";
import { ORDER_OPTIONS } from "../SearchSortInputs/OrderBySelect/OrderBySelect.model";
import { SearchBar } from "../SearchSortInputs/SearchBar";
import { SortingDirection } from "../SearchSortInputs/SortingDirection";
import { SORTING_DIRECTIONS } from "../SearchSortInputs/SortingDirection/SortingDirection.model";

const bookSearchInputs = (
  dispatchNewSearch: React.Dispatch<IAllSearchSortAction>
) => {
  return {
    template: [
      "search search search orderBy orderBy sortDirection borrowedOnly borrowedOnly borrowedOnly",
    ],
    items: [
      {
        name: "search",
        label: "Szukaj książki",
        setCurrentSearch: dispatchNewSearch,
        component: SearchBar,
      },
      {
        name: "sortDirection",
        setDirection: dispatchNewSearch,
        initialValue: SORTING_DIRECTIONS.ASC,
        component: SortingDirection,
      },
      {
        name: "orderBy",
        orderOptions: [ORDER_OPTIONS.ID, ORDER_OPTIONS.TITLE],
        setOrderType: dispatchNewSearch,
        component: OrderBySelect,
      },
      {
        name: "borrowedOnly",
        label: "Wyświetl tylko wypożyczone książki",
        setValue: dispatchNewSearch,
        initialValue: false,
        component: CheckboxFilter,
      },
    ],
  };
};

export { bookSearchInputs };
