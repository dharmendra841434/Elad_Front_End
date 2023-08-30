import * as React from "react";
const DashboardIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill={props.color}
      d="M2 18c-.55 0-1.021-.196-1.413-.588A1.922 1.922 0 0 1 0 16V7c0-.317.071-.617.213-.9.142-.283.338-.517.587-.7l6-4.5a2.11 2.11 0 0 1 .575-.3c.2-.067.408-.1.625-.1.217 0 .425.033.625.1s.392.167.575.3l6 4.5c.25.183.446.417.588.7.142.283.213.583.212.9v9c0 .55-.196 1.021-.588 1.413A1.922 1.922 0 0 1 14 18h-4v-7H6v7H2Z"
    />
  </svg>
);
export default DashboardIcon;
