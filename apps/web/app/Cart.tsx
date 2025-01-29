import { InventoryItem } from "types";
import { Modal } from "./Modal";
import AddIcon from "./icons/Add";
import { ChangeEvent, useState } from "react";
import jsPDF from "jspdf";
import { BlobProvider, Page, PDFDownloadLink } from "@react-pdf/renderer";
import ReciptPDF from "./ReciptPDF";
import { CartItems } from "./types";

export const Cart = ({
  closeModal,
  items,
}: {
  closeModal: () => void;
  items: CartItems[];
}) => {
  const [cartItems, setCartItems] = useState(items);

  const getCartPrice = () => {
    return cartItems.reduce((prev, curr) => prev + curr.rate * curr.count, 0);
  };

  const handleInputChange = (id) => (e: ChangeEvent<HTMLInputElement>) => {
    const cartClone = structuredClone(cartItems);
    const itemIndex = cartClone.findIndex((item) => item.id === id);
    const qty = e.target.value;

    cartClone[itemIndex].count = Number(qty);
    setCartItems(cartClone);
  };

  const generateAndPrintRecipt = (blob: Blob | null) => {
    // const pdf = new jsPDF({
    //   unit: "mm",
    //   format: [58, 1000],
    // });
    //
    // pdf.setFont("Helvetica", "bold");
    // pdf.setFontSize(15);
    // pdf.text("Saini Sweets", 12.5, 10);
    // // pdf.autoPrint();
    //
    // pdf.save("invoice");

    const url = URL.createObjectURL(blob); // Create a URL for the generated PDF
    const newWindow = window.open(url, "_blank"); // Open in a new tab

    if (newWindow) {
      newWindow.print(); // Trigger the print dialog
    }
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
        <h1 className="font-semibold text-center w-full my-3 pb-5 text-[20px] border border-transparent border-b-black mb-5">
          Cart
        </h1>
        <form className="flex w-full flex-col">
          {cartItems.map((item) => {
            return (
              <div
                className="w-full flex mb-2 pb-2 border border-transparent border-b-slate-200"
                key={item.id}
              >
                <p>
                  {item.name} x
                  <input
                    type="number"
                    value={item.count}
                    className="w-[50px] ml-1 p-1 pl-2"
                    onChange={handleInputChange(item.id)}
                  />{" "}
                  {item.unit}
                </p>
                <span className="ml-auto">
                  &#8377; {item.count * item.rate}
                </span>
              </div>
            );
          })}
        </form>
        <p className="flex w-full font-semibold border border-transparent border-b-black text-[18px] pb-3">
          Total: <span className="ml-auto">&#8377; {getCartPrice()}</span>
        </p>
        <BlobProvider document={<ReciptPDF cartItems={cartItems} />}>
          {({ blob, url, loading }) =>
            loading ? (
              "Loading..."
            ) : (
              <button
                className="mt-5 bg-purple-400 p-2 rounded-lg text-white"
                onClick={() => generateAndPrintRecipt(blob)}
              >
                Print Recipt
              </button>
            )
          }
        </BlobProvider>
      </div>
    </Modal>
  );
};
