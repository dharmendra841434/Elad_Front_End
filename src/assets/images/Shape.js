import * as React from "react";
const Shape = (props) => (
  <svg width={32} height={39} fill="none" {...props}>
    <path
      fill="#F06"
      fillRule="evenodd"
      d="M28.596 25.868A15.931 15.931 0 0 0 32 16c0-8.837-7.163-16-16-16S0 7.163 0 16c0 3.723 1.272 7.15 3.404 9.868L3.272 26 16 38.728 28.728 26l-.132-.132Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Shape;
