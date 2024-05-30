import { TListVariants } from "../../shared/constants/listVariants";
import { IBookData } from "../../shared/constants/queryModels/book.model";
import { IUserData } from "../../shared/constants/queryModels/user.model";

interface IDetailsCardProps {
  variant: TListVariants;
  data: IUserData | IBookData;
}

export type { IDetailsCardProps };
