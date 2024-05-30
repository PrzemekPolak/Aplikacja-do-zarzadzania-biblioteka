import { app, ipcMain } from "electron";
import { selectDbFunction } from "./selectDbFunction";
import { QueryOption } from "./queries.model";

app.whenReady().then(() => {
  ipcMain.handle("dbAction", async (_event, actionName: QueryOption, values: any) => {
    return await selectDbFunction(actionName, values);
  });
});
