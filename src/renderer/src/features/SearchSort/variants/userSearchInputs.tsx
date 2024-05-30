import { IAllSearchSortAction } from "../SearchSort.model";
import { OrderBySelect } from "../SearchSortInputs/OrderBySelect";
import { ORDER_OPTIONS } from "../SearchSortInputs/OrderBySelect/OrderBySelect.model";
import { SearchBar } from "../SearchSortInputs/SearchBar";
import { SortingDirection } from "../SearchSortInputs/SortingDirection";
import { SORTING_DIRECTIONS } from "../SearchSortInputs/SortingDirection/SortingDirection.model";

const userSearchInputs = (
  dispatchNewSearch: React.Dispatch<IAllSearchSortAction>
) => {
  return {
    template: ["search search search orderBy orderBy sortDirection . ."],
    items: [
      {
        name: "search",
        label: "Szukaj użytkownika",
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
        orderOptions: [ORDER_OPTIONS.ID, ORDER_OPTIONS.USER_SURNAME],
        setOrderType: dispatchNewSearch,
        component: OrderBySelect,
      },
    ],
  };
};

export { userSearchInputs };
