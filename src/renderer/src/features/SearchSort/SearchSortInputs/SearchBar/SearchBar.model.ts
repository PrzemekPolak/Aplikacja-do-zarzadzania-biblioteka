import { IAllSearchSortAction } from "../../SearchSort.model";

interface ISearchBarProps {
  name: string;
  setCurrentSearch: React.Dispatch<IAllSearchSortAction>;
  label: string;
}

export type { ISearchBarProps };
