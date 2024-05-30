import { TListVariants } from "../../shared/constants/listVariants";
import { IBookData } from "../../shared/constants/queryModels/book.model";
import { IBorrowedData } from "../../shared/constants/queryModels/borrowed.model";
import { IUserData } from "../../shared/constants/queryModels/user.model";

interface ITemplatedListProps {
  listData: Array<IUserData> | Array<IBookData> | Array<IBorrowedData>;
  variant: TListVariants;
  onElementClick?: Function;
}

type TAllListData = IUserData | IBookData | IBorrowedData;

export type { ITemplatedListProps, TAllListData };
