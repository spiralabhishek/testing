import React from "react";

interface ContentContainerType {
  children?: React.ReactNode;
}

const ContentContainer: React.FC<ContentContainerType> = ({ children }) => {
  return (
    <div
      id="ContentContainer"
      className="relative z-0 bg-[#ffffff] min-h-screen rounded-[25px] p-5"
    >
      {children}
    </div>
  );
};

export default ContentContainer;
