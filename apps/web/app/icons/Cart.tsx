import { IconProps } from "./types";

const CartIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M184 184H69.8L41.9 30.6a8 8 0 0 0-7.8-6.6H16"
    />
    <circle
      cx={80}
      cy={204}
      r={20}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
    />
    <circle
      cx={184}
      cy={204}
      r={20}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
    />
    <path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M62.5 144h125.6a15.9 15.9 0 0 0 15.7-13.1L216 64H48"
    />
  </svg>
);
export default CartIcon;
