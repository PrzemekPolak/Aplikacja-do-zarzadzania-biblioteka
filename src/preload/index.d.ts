import { ElectronAPI } from "@electron-toolkit/preload";
import { TQueriesOptions } from "src/renderer/database/queries.model";
import { QueryOption } from "../renderer/database/queries.model";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: IApiFunctions;
  }
}

interface IApiFunctions {
  dbAction: (actionName: QueryOption, values: any) => {};
}
