import React from "react";

import ContentContainer from "@/components/ContentContainer";
import DashboardHeader from "./component/dashboard/DashboardHeader";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NewPostMenu from "./component/NewPostMenu";

const ProfessionalDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await currentUser();

    return (
        <ContentContainer>
            <DashboardHeader />
            {children}
            <div>
                <NewPostMenu />
            </div>
        </ContentContainer>
    );
};

export default ProfessionalDashboardLayout;
