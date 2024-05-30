import { parseQueryData } from "./parseQueryData";
import { QueryOption } from "./queries.model";
import {appContainer} from "./Infrastructure/Resources/services";
import {Books} from "./Domain/Books";
import {TYPES} from "./Infrastructure/Resources/AvailableInterfaces";
import {GetBooksListAction} from "./Presentation/Controller/GetBooksListAction";
import {Users} from "./Domain/Users";
import {AddBookAction} from "./Presentation/Controller/AddBookAction";
import {GetUsersListAction} from "./Presentation/Controller/GetUsersListAction";
import {AddUserAction} from "./Presentation/Controller/AddUserAction";
import {GetUserAction} from "./Presentation/Controller/GetUserAction";
import {GetBookAction} from "./Presentation/Controller/GetBookAction";
import {UpdateBookAction} from "./Presentation/Controller/UpdateBookAction";
import {Borrowings} from "./Domain/Borrowings";
import {AddBorrowingAction} from "./Presentation/Controller/AddBorrowingAction";
import {GetBorrowingAction} from "./Presentation/Controller/GetBorrowingAction";
import {GetBorrowingsListAction} from "./Presentation/Controller/GetBorrowingsListAction";
import {GetBorrowingsListForUserAction} from "./Presentation/Controller/GetBorrowingsListForUserAction";
import {GetBorrowingsListForBookAction} from "./Presentation/Controller/GetBorrowingsListForBookAction";
import {UpdateBorrowingAction} from "./Presentation/Controller/UpdateBorrowingAction";
import {UpdateUserAction} from "./Presentation/Controller/UpdateUserAction";
import {FinishBorrowingAction} from "./Presentation/Controller/FinishBorrowingAction";
import {DeleteRecordAction} from "./Presentation/Controller/DeleteRecordAction";
import {GetMissingBooksIdsAction} from "./Presentation/Controller/GetMissingBooksIdsAction";
import {GetRecommendationsForUserAction} from "./Presentation/Controller/GetRecommendationsForUserAction";
import {RateBorrowingAction} from "./Presentation/Controller/RateBorrowingAction";
import {Recommendations} from "./Domain/Recommendations";
import {ExcludeRecommendationAction} from "./Presentation/Controller/ExcludeRecommendationAction";

const getRoute = (actionName: string, borrowings: Borrowings, books: Books, users: Users, recommendations: Recommendations) => {
  switch(actionName) {
    case QueryOption.GetBooksList:
      return new GetBooksListAction(books, borrowings);
    case QueryOption.GetBookData:
      return new GetBookAction(books, borrowings);
    case QueryOption.AddBook:
      return new AddBookAction(books);
    case QueryOption.EditBook:
      return new UpdateBookAction(books);
    case QueryOption.GetUsersList:
      return new GetUsersListAction(users);
    case QueryOption.GetUserData:
      return new GetUserAction(users);
    case QueryOption.AddUser:
      return new AddUserAction(users);
    case QueryOption.EditUser:
      return new UpdateUserAction(users);
    case QueryOption.GetBorrowedList:
      return new GetBorrowingsListAction(borrowings, books, users);
    case QueryOption.GetUserBorrowedList:
      return new GetBorrowingsListForUserAction(borrowings, books);
    case QueryOption.GetBookBorrowedList:
      return new GetBorrowingsListForBookAction(borrowings, users);
    case QueryOption.GetBorrowedData:
      return new GetBorrowingAction(borrowings, books, users);
    case QueryOption.AddBorrowed:
      return new AddBorrowingAction(borrowings);
    case QueryOption.EditBorrowed:
      return new UpdateBorrowingAction(borrowings);
    case QueryOption.EndBorrowing:
      return new FinishBorrowingAction(borrowings);
    case QueryOption.RateBorrowing:
      return new RateBorrowingAction(borrowings);
    case QueryOption.DeleteRecord:
      return new DeleteRecordAction(borrowings, users, books);
    case QueryOption.GetMissingBookIds:
      return new GetMissingBooksIdsAction(books);
    case QueryOption.GetRecommendations:
      return new GetRecommendationsForUserAction(books, borrowings, recommendations);
    case QueryOption.ExcludeRecommendation:
      return new ExcludeRecommendationAction(recommendations);
    default:
      return null;
  }
}

const selectDbFunction = async (actionName: QueryOption, values: any) => {
  const parsedValues = parseQueryData(values);
  const route = getRoute(
    actionName,
    appContainer.get<Borrowings>(TYPES.Borrowings),
    appContainer.get<Books>(TYPES.Books),
    appContainer.get<Users>(TYPES.Users),
    appContainer.get<Recommendations>(TYPES.Recommendations),
  );

  console.log('RECEIVED REQUEST FOR: ' + actionName);
  console.log(parsedValues);

  if (null !== route) {
    const response = route.invoke(parsedValues);

    console.log('RESPONSE FOR: ' + actionName);
    console.log(response);

    return response;
  }

  throw new Error(`No matching BE route found for '${actionName}'`);
};

export { selectDbFunction, getRoute };
