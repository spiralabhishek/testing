"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Catalog() {
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
        <>
            <div className="professional_dashboard_entry bg-[#f5f5f5] hover:bg-zinc-100 cursor-pointer transition my-2 py-2">
                <div className="flex justify-between items-center bg-[#FAFAFA] px-3 py-2 rounded-xl my-3">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex items-center gap-5">

                            <div className="bg-[#FFE7DF] md:w-[90px] md:h-[60px] lg:w-[100px] lg:h-[70px] xl:w-[120px] xl:h-[80px] rounded-2xl flex justify-end items-end pe-3 pb-2 md:pt-2 lg:pt-2 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                                <div className="text-right leading-normal">
                                    <h5 className="text-[20px] font-[800] text-[#353535]">--</h5>
                                    <p className="text-[17px]">נסגר</p>
                                </div>
                            </div>
                            <div className="bg-[#D6F5FF] md:w-[90px] md:h-[60px] lg:w-[100px] lg:h-[70px] xl:w-[120px] xl:h-[80px] rounded-2xl flex justify-end items-end pe-3 pb-2 md:pt-2 lg:pt-2 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                                <div className="text-right leading-normal">
                                    <h5 className="text-[20px] font-[800] text-[#353535]">6</h5>
                                    <p className="text-[17px]">פעילים</p>
                                </div>
                            </div>
                            <div className="bg-[#FAFAFA] md:w-[90px] md:h-[60px] lg:w-[100px] lg:h-[70px] xl:w-[120px] xl:h-[80px] rounded-2xl flex justify-end items-end pe-3 pb-2 md:pt-2 lg:pt-2 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                                <div className="text-right leading-normal">
                                    <h5 className="text-[20px] font-[800] text-[#353535]">40</h5>
                                    <p className="text-[17px]">סה״כ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-[#FAFAFA] px-3 py-2 rounded-xl my-3">
                    <div className="flex justify-between items-center gap-5">
                        <label>
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                        </label>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 text-black">
                            <button type="button" className="bg-[#FBDC48] px-4 py-1 rounded-lg text-black">שאלה</button>
                            <p className="bg-[#F2F2F2] p-2 rounded-md">האם אתם עושים קמפיינים ממומנים בגוגל ופייסבוק?</p>
                            <h5 className="text-[20px] font-bold">1</h5>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-[#FAFAFA] px-3 py-2 rounded-xl my-3">
                    <div className="flex justify-between items-center gap-5">
                        <label>
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                        </label>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 text-black">
                            <button type="button" className="bg-[#FBDC48] px-4 py-1 rounded-lg text-black">שאלה</button>
                            <p className="bg-[#F2F2F2] p-2 rounded-md">האם אתם עושים קמפיינים ממומנים בגוגל ופייסבוק?</p>
                            <h5 className="text-[20px] font-bold">2</h5>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-[#FAFAFA] px-3 py-2 rounded-xl my-3">
                    <div className="flex justify-between items-center gap-5">
                        <label>
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                        </label>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 text-black">
                            <button type="button" className="bg-[#FBDC48] px-4 py-1 rounded-lg text-black">שאלה</button>
                            <p className="bg-[#F2F2F2] p-2 rounded-md">האם אתם עושים קמפיינים ממומנים בגוגל ופייסבוק?</p>
                            <h5 className="text-[20px] font-bold">3</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
