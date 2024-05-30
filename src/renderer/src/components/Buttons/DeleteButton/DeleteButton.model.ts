import { DbTable } from "../../../../database/db.model";

interface IDeleteButtonProps {
  dbTable: DbTable;
  entryId: string;
  navLink?: string;
}

export type { IDeleteButtonProps };
