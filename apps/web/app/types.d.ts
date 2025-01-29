import { InventoryItem } from "types";

type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  responseObject: T;
  message: string;
};

type CartItem = {
  name: string;
  count: number;
  price: number;
  unit: "kg" | "piece";
};

type IDCount = {
  [id: string]: number;
};

type CartItems = InventoryItem & { count: number };
