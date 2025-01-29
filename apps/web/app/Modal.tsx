import { ReactNode } from "react";

export function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="fixed top-0 left-0 flex w-full h-full bg-gray-500 bg-opacity-50 z-10 overflow-y-auto">
      {children}
    </div>
  );
}
