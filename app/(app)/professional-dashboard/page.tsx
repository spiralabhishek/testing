"use server";

import DashboardCenterbar from "@/app/(app)/professional-dashboard/component/dashboard/DashboardCenterbar";
import DashboardLeftbar from "@/app/(app)/professional-dashboard/component/dashboard/DashboardLeftbar";
import DashboardRightbar from "@/app/(app)/professional-dashboard/component/dashboard/DashboardRightbar";
import NewPostMenu from "@/app/(app)/professional-dashboard/component/NewPostMenu";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfessionalDashboardContainer from "./component/ProfessionalDashboardContainer";

export default async function DashboardPage() {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await currentUser();

    const userRole = user?.publicMetadata.role as string;

    if (!["Professional", "Admin"].includes(userRole)) {
        return <div>Unauthorized: You do not have access to this page.</div>;
    }

    return (
        <ProfessionalDashboardContainer>
            <div className="flex justify-between gap-5">
                <DashboardRightbar />
                <DashboardCenterbar />
                <DashboardLeftbar />
            </div>
        </ProfessionalDashboardContainer>
    );
}
