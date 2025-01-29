import { IconProps } from "./types";

const AddIcon = (props: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <defs>
      <style>
        {
          ".cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
        }
      </style>
    </defs>
    <title />
    <g id="plus">
      <path d="M16 7v18M7 16h18" className="cls-1" />
    </g>
  </svg>
);

export default AddIcon;
