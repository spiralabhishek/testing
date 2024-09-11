import React from "react";

const ProfessionalDashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-0 mt-8 flex flex-col [direction:rtl;]">
      {children}
    </div>
  );
};

export default ProfessionalDashboardContainer;
