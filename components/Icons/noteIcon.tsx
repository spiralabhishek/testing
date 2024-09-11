import React from "react";

const NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
    return (
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.3266 0H6.68483C2.49674 0 0 2.4955 0 6.6815V16.307C0 20.5045 2.49674 23 6.68483 23H16.3151C20.5032 23 23 20.5045 23 16.3185V6.6815C23.0115 2.4955 20.5147 0 16.3266 0ZM10.2976 17.8365C9.96397 18.17 9.33115 18.492 8.87092 18.561L6.04051 18.9635C5.93696 18.975 5.83341 18.9865 5.72986 18.9865C5.25812 18.9865 4.8209 18.8255 4.51025 18.515C4.13056 18.1355 3.96948 17.5835 4.06152 16.974L4.46422 14.145C4.53326 13.6735 4.84391 13.0525 5.18909 12.719L10.3206 7.59C10.5035 8.10513 10.7346 8.60183 11.011 9.0735C11.126 9.269 11.2526 9.453 11.3562 9.591C11.4827 9.7865 11.6323 9.9705 11.7243 10.074C11.7819 10.1545 11.8279 10.212 11.8509 10.235C12.1385 10.58 12.4722 10.902 12.7599 11.1435C12.8404 11.224 12.8864 11.27 12.9094 11.2815C13.082 11.4195 13.2546 11.5575 13.4042 11.661C13.5883 11.799 13.7724 11.9255 13.968 12.029C14.1981 12.167 14.4512 12.2935 14.7043 12.42C14.969 12.535 15.2106 12.6385 15.4522 12.719L10.2976 17.8365ZM17.6843 10.4535L16.6258 11.523C16.5925 11.556 16.553 11.5822 16.5095 11.6C16.4661 11.6177 16.4196 11.6267 16.3727 11.6265C16.3381 11.6265 16.2921 11.6265 16.2691 11.615C15.1133 11.2801 14.061 10.6585 13.2101 9.80801C12.3591 8.95751 11.7372 7.90573 11.4022 6.7505C11.3677 6.624 11.4022 6.486 11.4942 6.4055L12.5643 5.336C14.3131 3.588 15.9815 3.6225 17.6958 5.336C18.5703 6.21 18.996 7.0495 18.996 7.9235C18.9845 8.7515 18.5588 9.5795 17.6843 10.4535Z"
                fill="#3EABF8" />
        </svg>

    );
};

export default NoteIcon;
