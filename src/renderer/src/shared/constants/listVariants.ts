const LIST_VARIANTS: IListVariants = {
  USER: "user",
  BORROWED: "borrowed",
  BOOK: "book",
  USER_BORROWED: "userBorrowed",
  BOOK_BORROWED: "bookBorrowed",
};

interface IListVariants {
  USER: "user";
  BORROWED: "borrowed";
  BOOK: "book";
  USER_BORROWED: "userBorrowed";
  BOOK_BORROWED: "bookBorrowed";
}

type TListVariants =
  | "user"
  | "borrowed"
  | "book"
  | "userBorrowed"
  | "bookBorrowed";

type TVariantsImports = {
  [variant in TListVariants]: any;
};

export { LIST_VARIANTS };
export type { IListVariants, TListVariants, TVariantsImports };
