import ky from "ky";
import type { InventoryItem } from "@repo/types";
import { Item } from "./Item";

export default async function Home() {
  let items: InventoryItem[] = [];
  try {
    const response: ApiResponse<InventoryItem[]> = await ky(
      "http://localhost:8000/inventory/find-all",
    ).json();

    items = response.responseObject;
  } catch (error: any) {
    console.log("ERROR!!");
  }

  return (
    <div className="flex-col flex">
      <header className="w-full text-white flex px-5 py-3 mb-5 bg-purple-500 font-bold">
        Saini Sweets
      </header>
      <div className="w-full flex justify-center">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
