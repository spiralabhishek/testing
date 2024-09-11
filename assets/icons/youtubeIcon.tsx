import React from "react";

const YoutubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
    return (
        <svg width="37"
            height="28"
            viewBox="0 0 37 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M27.3 0H9.1C3.64 0 0 3.5 0 8.75V19.25C0 24.5 3.64 28 9.1 28H27.3C32.76 28 36.4 24.5 36.4 19.25V8.75C36.4 3.5 32.76 0 27.3 0ZM21.6398 15.8025L17.1444 18.3925C15.3244 19.4425 13.832 18.6375 13.832 16.59V11.3925C13.832 9.34502 15.3244 8.54002 17.1444 9.59002L21.6398 12.18C23.3688 13.195 23.3688 14.805 21.6398 15.8025Z"
                fill="white"
            />
        </svg>
    );
};

export default YoutubeIcon;
