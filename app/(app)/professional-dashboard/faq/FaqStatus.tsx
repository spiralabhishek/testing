import React from 'react'

const FaqStatus = () => {
    return (
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
    )
}

export default FaqStatus
