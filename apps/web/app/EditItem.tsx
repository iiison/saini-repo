import { ChangeEvent, MouseEvent, useState } from "react";
import { InventoryItem } from "types";
import { Modal } from "./Modal";
import AddIcon from "./icons/Add";
import ky from "ky";

export const EditItem = ({
  item,
  saveItem,
  closeModal,
}: {
  closeModal: () => void;
  item?: InventoryItem | undefined;
  saveItem: (data: Pick<InventoryItem, "id" | "rate" | "name">) => void;
}) => {
  const [itemState, setItemState] = useState<Partial<InventoryItem>>({
    id: item?.id,
    name: item?.name,
    rate: item?.rate,
  });

  const inputClasses = "border rounded-lg mb-4 p-2";
  const handleInputChange =
    (property: keyof InventoryItem) => (e: ChangeEvent<HTMLInputElement>) => {
      setItemState((state) => {
        return {
          ...state,
          [property]: e.target.value,
        };
      });
    };

  const handleSubmitClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    saveItem(itemState);
  };

  const handleDeleteItem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!item?.id) return;

    const url = "http://192.168.1.10:8000/inventory/delete";

    await ky.post(url, {
      body: JSON.stringify({ id: item.id }),
      headers: {
        "content-type": "application/json",
      },
    });

    window.location.reload();
  };

  return (
    <Modal>
      <div className="w-[350px] h-full flex flex-col bg-white p-5 absolute top-0 right-0">
        <button
          onClick={closeModal}
          className="px-2 py-1 rotate-45 absolute right-2 top-2"
        >
          <AddIcon width={25} height={25} className="stroke-purple-500" />
        </button>

        <h1 className="font-semibold text-center w-full my-3 text-[20px]">
          {item ? "Edit Item" : "Add Item"}
        </h1>
        <form className="flex w-full flex-col">
          <input
            type="text"
            placeholder="Item Name"
            value={itemState.name}
            className={inputClasses}
            onChange={handleInputChange("name")}
          />
          <input
            type="number"
            placeholder="Price"
            value={itemState.rate}
            className={inputClasses}
            onChange={handleInputChange("rate")}
          />
          <button
            onClick={handleSubmitClick}
            className="bg-purple-400 p-2 rounded-lg text-white"
          >
            Submit
          </button>
          {item && (
            <button
              onClick={handleDeleteItem}
              className="border border-rose-400 p-2 rounded-lg text-rose-500 mt-5"
            >
              Delete Item
            </button>
          )}
        </form>
      </div>
    </Modal>
  );
};
