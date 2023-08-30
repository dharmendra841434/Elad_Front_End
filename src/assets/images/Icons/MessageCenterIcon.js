import * as React from "react";
const MessageCenterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill={props.color}
      d="M0 5.994A5.99 5.99 0 0 1 6 0h8c3.313 0 6 2.695 6 5.994V18H6c-3.313 0-6-2.695-6-5.994V5.994ZM12 8v2h2V8h-2ZM6 8v2h2V8H6Z"
    />
  </svg>
);
export default MessageCenterIcon;
