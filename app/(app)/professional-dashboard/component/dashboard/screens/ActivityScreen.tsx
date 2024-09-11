import React, { useState, useEffect } from "react";
import Image from "next/image";
import PopupScreen from "@/components/PopupScreen";

export const available = [
    {
        day: "יום ראשון",
        startTime: "00:00",
        endTime: "00:00",
        status: true,
    },
    {
        day: "יום שני",
        startTime: "00:00",
        endTime: "00:00",
        status: true,
    },
    {
        day: "יום שלישי",
        startTime: "00:00",
        endTime: "00:00",
        status: true,
    },
    {
        day: "יום רביעי",
        startTime: "00:00",
        endTime: "00:00",
        status: true,
    },
    {
        day: "יום חמישי",
        startTime: "00:00",
        endTime: "00:00",
        status: true,
    },
    {
        day: "יום שישי",
        startTime: "00:00",
        endTime: "00:00",
        status: true,
    },
    {
        day: "יום שבת",
        startTime: "00:00",
        endTime: "00:00",
        status: true,
    },
];

interface TimeSlot {
    day: string;
    startTime: string;
    endTime: string;
    status: boolean;
}

const ActivityScreen  = ({ toggleScreen }: { toggleScreen: () => void }) => {
    const [days, setDays] = useState<TimeSlot[]>([]);

    const addTime = (days: TimeSlot[]) => {
        console.log(days);
    };

    useEffect(() => {
        setDays(available);
    }, []);

    // Corrected handleTimeChange function
    const handleTimeChange = (newTime: string, index: number, type: "startTime" | "endTime") => {
        const updatedDays = days.map((day, i) =>
            i === index ? { ...day, [type]: newTime } : day
        );
        setDays(updatedDays);
    };

    const toggleStatus = (index: number) => {
        const updatedDays = days.map((day, i) =>
            i === index ? { ...day, status: !day.status } : day
        );
        setDays(updatedDays);
    };

    const handleSubmit = () => {
        addTime(days);
    };

    const leftArrow = (
        <Image
            onClick={toggleScreen}
            src={"/left-arrow.svg"}
            width={16}
            height={16}
            alt="leftArrow"
            className="cursor-pointer"
        />
    );

    return (
        <PopupScreen title="שעות פעילות" headerLeft={leftArrow}>
            <div className="flex flex-col w-[459px] h-full mt-5 py-5">
                {days.map((day, index) => (
                    <div key={index} className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={day.status}
                                    onChange={() => toggleStatus(index)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3EABF8]"></div>
                            </label>
                        </div>
                        <div className="timeWrap">
                            <input
                                className="time-input"
                                type="time"
                                value={day.startTime}
                                onChange={(ev) => handleTimeChange(ev.target.value, index, "startTime")}
                            />
                            {" - "}
                            <input
                                className="time-input"
                                type="time"
                                value={day.endTime}
                                onChange={(ev) => handleTimeChange(ev.target.value, index, "endTime")}
                            />
                        </div>
                        <div className="text-lg text-black w-[80px]">{day.day}</div>
                    </div>
                ))}
                <div className="px-4 mt-auto">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 mt-6 bg-yellow-400 text-white rounded-full text-lg font-semibold"
                    >
                        שמירה
                    </button>
                </div>
            </div>
        </PopupScreen>
    );
};

export default ActivityScreen;
