import { IAllSearchSortAction } from "../../SearchSort.model";

type TOrderOptions =
  | "ID"
  | "TITLE"
  | "BORROWED_DATE"
  | "RETURNED_DATE"
  | "USER_SURNAME";

interface IOrderBySelectProps {
  name: string;
  orderOptions: Array<TOrderOptions>;
  setOrderType: React.Dispatch<IAllSearchSortAction>;
  initialValue?: TOrderOptions;
}

type TPossibleOptions = {
  [option in TOrderOptions]: string;
};

const ORDER_OPTIONS: IORDER_OPTIONS = {
  ID: "ID",
  TITLE: "TITLE",
  BORROWED_DATE: "BORROWED_DATE",
  RETURNED_DATE: "RETURNED_DATE",
  USER_SURNAME: "USER_SURNAME",
};

interface IORDER_OPTIONS {
  ID: "ID";
  TITLE: "TITLE";
  BORROWED_DATE: "BORROWED_DATE";
  RETURNED_DATE: "RETURNED_DATE";
  USER_SURNAME: "USER_SURNAME";
}

export { ORDER_OPTIONS };
export type { IOrderBySelectProps, TPossibleOptions, TOrderOptions };
