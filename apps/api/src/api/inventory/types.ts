import { Request } from "express";
import { InventoryItem } from "types";

// TODO: Fix it
// id should not be optional
export type PartialInventoryItem = Omit<Partial<InventoryItem>, "id"> & {
  id?: InventoryItem["id"] | undefined; // NOT right, id should not be optional
};

export type InventoryItemID = {
  id?: InventoryItem["id"] | undefined;
};

export interface CustomUpdateReq extends Request {
  parsedBody?: PartialInventoryItem | undefined;
}

export interface DeleteInventoryReq extends Request {
  parsedBody: InventoryItemID;
}
