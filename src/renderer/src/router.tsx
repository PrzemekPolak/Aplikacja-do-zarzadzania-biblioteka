import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import { UserDetails } from "./pages/UserDetails";
import { AddBook } from "./pages/AddBook";
import { AddBorrowed } from "./pages/AddBorrowed";
import { AddUser } from "./pages/AddUser";
import { BooksList } from "./pages/BooksList";
import { BorrowedList } from "./pages/BorrowedList";
import { EditBook } from "./pages/EditBook";
import { EditBorrowedEntry } from "./pages/EditBorrowedEntry";
import { EditUser } from "./pages/EditUser";
import { UsersList } from "./pages/UsersList";
import { getFormValues } from "./shared/functions/getFormValues";
import { AdminPage } from "./pages/AdminPage";
import { useMemo } from "react";
import { BookDetails } from "./pages/BookDetails";
import { QueryOption } from "../database/queries.model";

const Router = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          path="/usersList"
          element={<UsersList />}
          action={async ({ request }) => {
            return window.api.dbAction(
              QueryOption.GetUsersList,
              await getFormValues(request)
            );
          }}
        />
        <Route
          path="/addUser"
          element={<AddUser />}
          action={async ({ request }) => {
            return window.api.dbAction(
              QueryOption.AddUser,
              await getFormValues(request)
            );
          }}
        />
        <Route
          path="/editUser/:userId"
          element={<EditUser />}
          action={async ({ params, request }) => {
            return window.api.dbAction(
              QueryOption.EditUser,
              await getFormValues(request, { entryId: params.userId })
            );
          }}
          loader={({ params }) => {
            return (
              (window.api.dbAction(QueryOption.GetUserData, {
                entryId: params.userId,
              })) ?? {}
            );
          }}
          shouldRevalidate={() => false}
        />
        <Route
          path="/booksList"
          element={<BooksList />}
          action={async ({ request }) => {
            return window.api.dbAction(
              QueryOption.GetBooksList,
              await getFormValues(request)
            );
          }}
        />
        <Route
          path="/addBook"
          element={<AddBook />}
          action={async ({ request }) => {
            return window.api.dbAction(
              QueryOption.AddBook,
              await getFormValues(request)
            );
          }}
        />
        <Route
          path="/editBook/:bookId"
          element={<EditBook />}
          action={async ({ params, request }) => {
            return window.api.dbAction(
              QueryOption.EditBook,
              await getFormValues(request, { entryId: params.bookId })
            );
          }}
          loader={({ params }) => {
            return (
              (window.api.dbAction(QueryOption.GetBookData, {
                entryId: params.bookId,
              })) ?? {}
            );
          }}
          shouldRevalidate={() => false}
        />
        <Route
          path="/borrowedList"
          element={<BorrowedList />}
          action={async ({ request }) => {
            return window.api.dbAction(
              QueryOption.GetBorrowedList,
              await getFormValues(request)
            );
          }}
        />
        <Route
          path="/addBorrowed"
          element={<AddBorrowed />}
          action={async ({ request }) => {
            return window.api.dbAction(
              QueryOption.AddBorrowed,
              await getFormValues(request)
            );
          }}
        />
        <Route
          path="/editBorrowedEntry/:entryId"
          element={<EditBorrowedEntry />}
          action={async ({ params, request }) => {
            return window.api.dbAction(
              QueryOption.EditBorrowed,
              await getFormValues(request, { entryId: params.entryId })
            );
          }}
          loader={({ params }) => {
            return (
              (window.api.dbAction(QueryOption.GetBorrowedData, {
                entryId: params.entryId,
              })) ?? {}
            );
          }}
          shouldRevalidate={() => false}
        />
        <Route
          path="/deleteRecord/:dbTable/:entryId"
          action={({ params }) => {
            return window.api.dbAction(QueryOption.DeleteRecord, {
              dbTable: params.dbTable,
              entryId: params.entryId,
            });
          }}
        />
        <Route
          path="/userDetails/:userId"
          element={<UserDetails />}
          loader={({ params }) => {
            return window.api.dbAction(QueryOption.GetUserData, {
              entryId: params.userId,
            });
          }}
          action={async ({ params, request }) => {
            return window.api.dbAction(
              QueryOption.GetUserBorrowedList,
              await getFormValues(request, { entryId: params.userId })
            );
          }}
        />
        <Route
          path="/userDetails/:userId/recommendations"
          loader={({params}) => {
            return window.api.dbAction(QueryOption.GetRecommendations, { entryId: params.userId });
          }}
        />
        <Route
          path="/userDetails/:userId/recommendations/:bookId/exclude"
          action={({params}) => {
            return window.api.dbAction(QueryOption.ExcludeRecommendation, { userId: params.userId, bookId: params.bookId });
          }}
        />
        <Route
          path="/bookDetails/:bookId"
          element={<BookDetails />}
          loader={({ params }) => {
            return (
              (window.api.dbAction(QueryOption.GetBookData, {
                entryId: params.bookId,
              })) ?? {}
            );
          }}
          action={async ({ params, request }) => {
            return window.api.dbAction(
              QueryOption.GetBookBorrowedList,
              await getFormValues(request, { entryId: params.bookId })
            );
          }}
        />
        <Route
          path="/fastEndBorrowing/:entryId"
          action={async ({ params, request }) => {
            return window.api.dbAction(
              QueryOption.EndBorrowing,
              await getFormValues(request, { entryId: params.entryId })
            );
          }}
        />
        <Route
          path="/rateBorrowing/:entryId"
          action={async ({ params, request }) => {
            return window.api.dbAction(
              QueryOption.RateBorrowing,
              await getFormValues(request, { entryId: params.entryId })
            );
          }}
        />
        <Route
          path="/getMissingBookIds"
          action={() => {
            return window.api.dbAction(QueryOption.GetMissingBookIds, {});
          }}
        />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    )
  );
  return useMemo(() => <RouterProvider router={router} />, []);
};

export { Router };
