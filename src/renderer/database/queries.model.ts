const enum QueryOption {
  GetUsersList = "getUsersList",
  GetBooksList = "getBooksList",
  GetBorrowedList = "GetBorrowedList",
  GetUserBorrowedList = "GetUserBorrowedList",
  GetBookBorrowedList = "GetBookBorrowedList",
  GetUserData = "GetUserData",
  GetBookData = "GetBookData",
  GetBorrowedData = "GetBorrowedData",
  GetMissingBookIds = "GetMissingBookIds",
  AddUser = "AddUser",
  AddBook = "AddBook",
  AddBorrowed = "addBorrowed",
  EditUser = "editUser",
  EditBook = "editBook",
  EditBorrowed = "editBorrowed",
  EndBorrowing = "endBorrowing",
  RateBorrowing = "rateBorrowing",
  DeleteRecord = "deleteRecord",
  GetRecommendations = "getRecommendations",
  ExcludeRecommendation = "excludeRecommendation",
}

export { QueryOption };
