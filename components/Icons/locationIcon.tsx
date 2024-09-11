import React from "react";

const locationIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill={props.fill || "#CACACA"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7696 6.02268C15.7628 1.86973 11.8988 0 8.50467 0H8.49508C5.1105 0 1.23693 1.86074 0.230191 6.01369C-0.891609 10.6521 2.30952 15.3706 5.0517 17.8426C6.02366 18.7246 7.15198 19.9999 8.50467 20C9.80864 20 10.9478 18.7595 11.9546 17.8426C14.6968 15.3706 17.8914 10.661 16.7696 6.02268ZM8.50467 10.5262C8.10804 10.5262 7.7153 10.453 7.34887 10.3107C6.98244 10.1684 6.64949 9.9598 6.36904 9.69687C6.08858 9.43393 5.86612 9.12178 5.71433 8.77824C5.56255 8.4347 5.48443 8.0665 5.48443 7.69465C5.48443 7.32281 5.56255 6.9546 5.71433 6.61106C5.86612 6.26752 6.08858 5.95537 6.36904 5.69244C6.64949 5.4295 6.98244 5.22093 7.34887 5.07863C7.7153 4.93633 8.10804 4.86309 8.50467 4.86309C9.30568 4.86309 10.0739 5.16142 10.6403 5.69244C11.2067 6.22346 11.5249 6.94368 11.5249 7.69465C11.5249 8.44563 11.2067 9.16585 10.6403 9.69687C10.0739 10.2279 9.30568 10.5262 8.50467 10.5262Z"
        fill={props.fill || "#CACACA"}
      />
    </svg>
  );
};

export default locationIcon;
