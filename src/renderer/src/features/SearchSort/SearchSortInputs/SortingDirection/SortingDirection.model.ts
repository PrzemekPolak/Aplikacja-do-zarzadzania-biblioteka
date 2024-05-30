import { IAllSearchSortAction } from "../../SearchSort.model";

type TSortingDirections = "ASC" | "DESC";

interface ISortingDirectionProps {
  name: string;
  initialValue: TSortingDirections;
  setDirection: React.Dispatch<IAllSearchSortAction>;
}

const SORTING_DIRECTIONS: ISORTING_DIRECTIONS = {
  ASC: "ASC",
  DESC: "DESC",
};

interface ISORTING_DIRECTIONS {
  ASC: "ASC";
  DESC: "DESC";
}

export { SORTING_DIRECTIONS };
export type { ISortingDirectionProps, TSortingDirections };
