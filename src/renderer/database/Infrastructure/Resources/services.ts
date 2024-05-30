import "reflect-metadata";
import {Container} from "inversify";
import {Books} from "../../Domain/Books";
import {TYPES} from "./AvailableInterfaces";
import {SqlBooks} from "../SqlBooks";
import {DbHelper} from "../DbHelper";
import {DbHelpers} from "../../Domain/DbHelpers";
import {TestDbHelper} from "../../Tests/TestUtils/Database/TestDbHelper";
import {Users} from "../../Domain/Users";
import {SqlUsers} from "../SqlUsers";
import {Borrowings} from "../../Domain/Borrowings";
import {SqlBorrowings} from "../SqlBorrowings";
import {Recommendations} from "../../Domain/Recommendations";
import {SqlRecommendations} from "../SqlRecommendations";

const appContainer = new Container();
appContainer.bind<Books>(TYPES.Books).to(SqlBooks);
appContainer.bind<DbHelpers>(TYPES.DbHelpers).to(DbHelper);
appContainer.bind<Users>(TYPES.Users).to(SqlUsers);
appContainer.bind<Borrowings>(TYPES.Borrowings).to(SqlBorrowings);
appContainer.bind<Recommendations>(TYPES.Recommendations).to(SqlRecommendations);

const testContainer = new Container();
testContainer.bind<Books>(TYPES.Books).to(SqlBooks);
testContainer.bind<DbHelpers>(TYPES.DbHelpers).to(TestDbHelper);
testContainer.bind<Users>(TYPES.Users).to(SqlUsers);
testContainer.bind<Borrowings>(TYPES.Borrowings).to(SqlBorrowings);
testContainer.bind<Recommendations>(TYPES.Recommendations).to(SqlRecommendations);

export {appContainer, testContainer};
