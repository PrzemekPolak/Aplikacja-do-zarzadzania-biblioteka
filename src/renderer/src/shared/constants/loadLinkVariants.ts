const LOAD_LINK_VARIANTS: ILoadLinkVariants = {
  user: "/usersList/",
  borrowed: "/borrowedList/",
  book: "/booksList/",
  userBorrowed: "/userDetails/",
  bookBorrowed: "/bookDetails/",
};

interface ILoadLinkVariants {
  user: "/usersList/";
  borrowed: "/borrowedList/";
  book: "/booksList/";
  userBorrowed: "/userDetails/";
  bookBorrowed: "/bookDetails/";
}

export { LOAD_LINK_VARIANTS };
export type { ILoadLinkVariants };
