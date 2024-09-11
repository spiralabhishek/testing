'use client'
import React, { useState } from "react";

// type UserQueryFilters = {
//   city?: string;
//   country?: string;
//   radiusKm?: number;
//   coordinates?: [number, number];
// };

interface UserQueryFilters {
    onFilter: (filters: any) => void;
}


const UserFilterForm: React.FC<UserQueryFilters> = ({ onFilter }) => {
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [radiusKm, setRadiusKm] = useState<number>(10);
    const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter({ city, country, radiusKm, coordinates });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow rounded-md">
            <div>
                <label className="block text-gray-700">City</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-black"
                />
            </div>
            <div>
                <label className="block text-gray-700">Country</label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-black"
                />
            </div>
            <div>
                <label className="block text-gray-700">Radius (km)</label>
                <input
                    type="number"
                    value={radiusKm}
                    onChange={(e) => setRadiusKm(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md text-black"
                />
            </div>
            <div>
                <label className="block text-gray-700">Coordinates (Lat, Long)</label>
                <input
                    type="text"
                    placeholder="Latitude, Longitude"
                    onChange={(e) => setCoordinates(
                        e.target.value.split(",").map(Number) as [number, number]
                    )}
                    className="w-full px-3 py-2 border rounded-md text-black"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Filter Users
            </button>
        </form>
    );
};

export default UserFilterForm;
