import React from "react";

const AssetManagementIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.1279 22.2194H22.9651V8.84085C22.9651 8.10486 22.6395 7.41635 22.0698 6.96525L20.6395 5.82565L20.6163 2.91727C20.6163 2.26437 20.093 1.74206 19.4535 1.74206H15.4884L13.9302 0.507481C13.093 -0.16916 11.907 -0.16916 11.0698 0.507481L2.93023 6.96525C2.36046 7.41635 2.03488 8.10486 2.03488 8.82898L1.97674 22.2194H0.872093C0.395349 22.2194 0 22.623 0 23.1097C0 23.5964 0.395349 24 0.872093 24H24.1279C24.6047 24 25 23.5964 25 23.1097C25 22.623 24.6047 22.2194 24.1279 22.2194ZM6.10465 12.1291V10.3485C6.10465 9.69556 6.62791 9.16137 7.26744 9.16137H9.59302C10.2326 9.16137 10.7558 9.69556 10.7558 10.3485V12.1291C10.7558 12.782 10.2326 13.3162 9.59302 13.3162H7.26744C6.62791 13.3162 6.10465 12.782 6.10465 12.1291ZM15.407 22.2194H9.59302V18.9549C9.59302 17.9696 10.3721 17.1742 11.3372 17.1742H13.6628C14.6279 17.1742 15.407 17.9696 15.407 18.9549V22.2194ZM18.8953 12.1291C18.8953 12.782 18.3721 13.3162 17.7326 13.3162H15.407C14.7674 13.3162 14.2442 12.782 14.2442 12.1291V10.3485C14.2442 9.69556 14.7674 9.16137 15.407 9.16137H17.7326C18.3721 9.16137 18.8953 9.69556 18.8953 10.3485V12.1291Z"
                fill={props.fill || "#3EABF8"} />
        </svg>
    );
};

export default AssetManagementIcon;
