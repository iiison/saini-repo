import { InventoryItem } from "types";

export function Item({ item }: { item: InventoryItem }) {
  return (
    <div className="rounded-md border-purple-500 border p-2 mx-1">
      {item.name}
    </div>
  );
}
