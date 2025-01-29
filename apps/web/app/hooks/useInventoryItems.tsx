"use client";

import ky from "ky";
import { useEffect, useState } from "react";
import type { InventoryItem } from "types";
import { ApiResponse } from "../types";

export function useInventoryItems() {
  const [items, setInventory] = useState<InventoryItem[]>();

  useEffect(() => {
    const getDataFromAPI = async () => {
      try {
        const response: ApiResponse<InventoryItem[]> = await ky(
          "http://192.168.1.10:8000/inventory/find-all",
        ).json();

        setInventory(response.responseObject);
      } catch (error: any) {
        console.log("ERROR!!");
      }
    };

    getDataFromAPI();
  }, []);

  return {
    inventory: items,
  };
}
