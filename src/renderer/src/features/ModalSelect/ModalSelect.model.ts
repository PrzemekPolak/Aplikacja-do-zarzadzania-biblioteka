import { TListVariants } from "../../shared/constants/listVariants";
import { IBookData } from "../../shared/constants/queryModels/book.model";
import { IUserData } from "../../shared/constants/queryModels/user.model";

interface IModalSelectProps {
  name: string;
  initialData: IUserData | IBookData | {};
  variant: TListVariants;
  modalTitle: string;
}

export type { IModalSelectProps };
