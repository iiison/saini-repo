"use client";

import { Item } from "./Item";
import AddIcon from "./icons/Add";
import { IDCount } from "./types";
import { useInventoryItems } from "./hooks/useInventoryItems";
import { useState } from "react";
import CartIcon from "./icons/Cart";
import { Modal } from "./Modal";
import { EditItem } from "./EditItem";
import { InventoryItem } from "types";
import ky from "ky";
import { Cart } from "./Cart";
import { useLocalIp } from "./hooks/useLocalIP";

export default function Home() {
  const { inventory } = useInventoryItems();
  const [showAddItems, setShowAddItems] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<InventoryItem["id"]>();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<IDCount>({});

  const handleShowCartClick = () => {
    setShowCart(!showCart);
  };

  const onEditItemClick = (id: InventoryItem["id"]) => {
    setActiveItem(id);
  };

  const closeModal = () => {
    setActiveItem(undefined);
    setShowAddItems(false);
    setShowCart(false);
  };

  const saveItem = ({
    id,
    name,
    rate,
    unit,
  }: Pick<InventoryItem, "id" | "rate" | "name" | "unit">) => {
    let url;
    const payload = {
      name,
      unit,
      rate: Number(rate),
    };

    if (id) {
      url = "http://192.168.1.10:8000/inventory/update";
      payload.id = id;
    } else {
      url = "http://192.168.1.10:8000/inventory/create";
    }

    ky.post(url, {
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const getItemsInCart = () =>
    items
      ?.filter((item) => cartItems[item.id] > 0)
      .map((item) => {
        return {
          ...item,
          count: cartItems[item.id],
        };
      });

  const handleAddItemClick = () => {
    setShowAddItems(!showAddItems);
  };

  const items = inventory;

  if (!items) {
    return <div>Loading Data...</div>;
  }

  return (
    <div className="flex-col flex">
      <header className="w-full text-white flex px-5 py-3 mb-5 bg-purple-500 font-bold items-center">
        <h2>Saini Sweets</h2>
        <div className="ml-auto flex">
          {Object.keys(cartItems).length > 0 && (
            <button
              onClick={handleShowCartClick}
              className="justify-self-end ml-auto flex items-center justify-center px-2 py-1 border border-white rounded font-normal mr-3"
            >
              <CartIcon width={20} height={20} className="stroke-white" />
              <span className="ml-1">Show Cart</span>
            </button>
          )}
          <button
            onClick={handleAddItemClick}
            className="justify-self-end ml-auto flex items-center justify-center px-2 py-1 border border-white rounded font-normal"
          >
            <AddIcon width={25} height={25} className="stroke-white" />
            <span className="ml-1">Add Items</span>
          </button>
        </div>
      </header>
      <div className="w-full flex justify-center flex-wrap gap-2 flex-col sm:flex-row px-4">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            cartItems={cartItems}
            onCartClick={setCartItems}
            onEditItemClick={onEditItemClick}
          />
        ))}
      </div>
      {showAddItems && <EditItem closeModal={closeModal} saveItem={saveItem} />}
      {showCart && <Cart closeModal={closeModal} items={getItemsInCart()} />}
      {activeItem && (
        <EditItem
          saveItem={saveItem}
          closeModal={closeModal}
          item={inventory.filter((i) => i.id === activeItem)[0]}
        />
      )}
    </div>
  );
}
