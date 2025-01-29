"use client";

import { Dispatch, MouseEvent, SetStateAction } from "react";
import { InventoryItem } from "types";
import { IDCount } from "./types";
import Pencil from "./icons/Pencil";

export function Item({
  item,
  cartItems,
  onCartClick,
  onEditItemClick,
}: {
  item: InventoryItem;
  cartItems: IDCount;
  onCartClick: Dispatch<SetStateAction<IDCount>>;
  onEditItemClick: (id: InventoryItem["id"]) => void;
}) {
  const handleEditItem =
    (id: InventoryItem["id"]) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onEditItemClick(id);
    };

  const handleAddCartItem = (i: InventoryItem) => () => {
    onCartClick((cartItems) => {
      const { id } = i;

      if (cartItems[id]) {
        return {
          ...cartItems,
          [id]: cartItems[id] + 1,
        };
      }
      return {
        ...cartItems,
        [id]: 1,
      };
    });
  };

  const isItemInCart = (id: InventoryItem["id"]) => {
    return !!cartItems[id];
  };

  return (
    <div
      className="relative rounded-md border-purple-500 border pl-4 pr-9 py-3 flex select-none"
      onClick={handleAddCartItem(item)}
    >
      <p className="flex flex-col">
        <span>{item.name}</span>
        <span className="text-[13px] -mt-1 ml-1">&#8377;{item.rate}</span>
      </p>
      {isItemInCart(item.id) && (
        <span className="absolute text-purple-500 right-2 top-1 text-[13px]">
          {cartItems[item.id]}
        </span>
      )}
      <button
        onClick={handleEditItem(item.id)}
        className={`absolute right-1 height-[30px] width-[30px] flex items-center justify-center z-[2] ${isItemInCart(item.id) ? "bottom-1" : "top-[50%] translate-y-[-50%]"}`}
      >
        <Pencil className="fill-purple-500 scale-75" width={20} height={20} />
      </button>
    </div>
  );
}
