import React from "react";
import { twMerge } from "tailwind-merge";

interface ProfessionalDashboardEntriesContainerType {
  children?: React.ReactNode;
  className?: string;
}

const ProfessionalDashboardEntriesContainer: React.FC<ProfessionalDashboardEntriesContainerType> = ({
  children,
  className,
}) => {
  return (
    <div
      id="ProfessionalDashboardEntriesContainer"
      className={twMerge("mt-4 md:mt-5 flex flex-col gap-y-6", className)}
    >
      {children}
    </div>
  );
};

export default ProfessionalDashboardEntriesContainer;
