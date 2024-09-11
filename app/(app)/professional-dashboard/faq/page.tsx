"use server";

import FaqStatus from "./FaqStatus";
import FaqList from "./FaqList";

export default async function Faq() {

    return (
        <>
            <div className="professional_dashboard_entry bg-[#f5f5f5] hover:bg-zinc-100 cursor-pointer transition my-2 py-2">
                <FaqStatus />
                <FaqList />
            </div>
        </>
    );
}
