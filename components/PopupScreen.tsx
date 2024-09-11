import React from "react";
import { twMerge } from "tailwind-merge";

interface PopupScreenType {
  className?: string;
  title?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
}
const PopupScreen: React.FC<PopupScreenType> = ({
  children,
  className,
  headerLeft,
  headerRight,
  title,
}) => {
  return (
    <div
      id="screen-container"
      className={twMerge(
        "flex flex-col items-center bg-white w-full h-full rounded-[25px] p-4 text-black",
        className
      )}
    >
      <section
        id="header-section"
        className="w-full flex items-center justify-between"
      >
        <div id="header-left">{headerLeft}</div>
        <h1 className="text-black">{title}</h1>
        <div id="header-right">{headerRight}</div>
      </section>
      <section id="content" className="w-full h-full">
        {children}
      </section>
    </div>
  );
};

export default PopupScreen;
