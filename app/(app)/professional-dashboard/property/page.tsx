"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PropertyRightbar from "./PropertyRightbar";
import PropertyLeftbar from "./PropertyLeftbar";
import ProfessionalDashboardEntriesContainer from "../component/ProfessionalDashboardEntriesContainer";
import ProfessionalDashboardEntry from "../component/ProfessionalDashboardEntry";

export default async function Property() {
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
        <div className="professional-inn  container-fluid px-3 mt-7">
            <div className="professional_dashboard_entry hover:bg-zinc-100 cursor-pointer transition my-2 py-2">
                <div className="flex justify-between items-center gap-5">
                    <PropertyLeftbar />
                    <PropertyRightbar />
                </div>
            </div>
            <div className="flex justify-between pb-10  h-[calc(100%-64px)]">
                <ProfessionalDashboardEntriesContainer className="w-[100%]">
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                    <ProfessionalDashboardEntry entryName="שיחות" price="₪1,200,000" />
                </ProfessionalDashboardEntriesContainer>
            </div>
        </div>
    );
}
