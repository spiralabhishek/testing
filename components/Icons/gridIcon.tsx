import React from "react";

const gridIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.0833 7.42708H9.34375V1.86875H15.5154C19.0038 1.86875 21.0833 3.94833 21.0833 7.42708Z"
        fill={props.fill || "#CACACA"}
      />
      <path
        d="M21.0833 15.5729C21.0354 18.9942 18.9654 21.0354 15.5154 21.0354H9.34375V15.5729H21.0833Z"
        fill={props.fill || "#CACACA"}
      />
      <path
        d="M7.90658 1.86865V21.0353H7.48491C3.99658 21.0353 1.91699 18.9557 1.91699 15.4674V7.43657C1.91699 3.94824 3.99658 1.86865 7.48491 1.86865H7.90658Z"
        fill={props.fill || "#CACACA"}
      />
      <path
        d="M21.0833 8.86458H9.34375V14.1354H21.0833V8.86458Z"
        fill={props.fill || "#CACACA"}
      />
    </svg>
  );
};

export default gridIcon;
