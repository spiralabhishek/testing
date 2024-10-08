import React from "react";

const MusicIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19.866 0H8.134C3.038 0 0 3.038 0 8.134V19.852C0 24.962 3.038 28 8.134 28H19.852C24.948 28 27.986 24.962 27.986 19.866V8.134C28 3.038 24.962 0 19.866 0ZM21.168 10.92C21.168 11.774 20.804 12.53 20.188 12.978C19.796 13.258 19.32 13.412 18.816 13.412C18.522 13.412 18.228 13.356 17.92 13.258L14.714 12.194C14.7 12.194 14.672 12.18 14.658 12.166V18.55C14.658 20.706 12.894 22.47 10.738 22.47C8.582 22.47 6.818 20.706 6.818 18.55C6.818 16.394 8.582 14.63 10.738 14.63C11.424 14.63 12.054 14.826 12.614 15.12V9.282V8.428C12.614 7.574 12.978 6.818 13.594 6.37C14.224 5.922 15.05 5.81 15.862 6.09L19.068 7.154C20.272 7.56 21.182 8.82 21.182 10.08V10.92H21.168Z"
                fill="white"
            />
        </svg>
    );
};

export default MusicIcon;
