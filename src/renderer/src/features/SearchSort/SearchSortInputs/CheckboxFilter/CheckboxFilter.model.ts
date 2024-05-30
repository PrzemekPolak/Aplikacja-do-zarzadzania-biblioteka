import { IAllSearchSortAction } from "../../SearchSort.model";

interface ICheckboxFilterProps {
  name: string;
  label: string;
  setValue: React.Dispatch<IAllSearchSortAction>;
  initialValue: boolean;
}

export type { ICheckboxFilterProps };
