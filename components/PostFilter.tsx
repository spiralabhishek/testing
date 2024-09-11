import React, { useState } from 'react';

// Define the props for the component
interface PostFilterProps {
  onFilterChange: (filters: any) => void;
}

const PostFilter: React.FC<PostFilterProps> = ({ onFilterChange }) => {
  // State for managing filter inputs
  const [filters, setFilters] = useState({
    longitude: '',
    latitude: '',
    radiusKm: '',
    city: '',
    country: '',
    type: '',
    title: '',
    isActive: '',
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Filter Posts</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={filters.longitude}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={filters.latitude}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Radius (km):</label>
          <input
            type="number"
            name="radiusKm"
            value={filters.radiusKm}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City:</label>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country:</label>
          <input
            type="text"
            name="country"
            value={filters.country}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type:</label>
          <input
            type="text"
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={filters.isActive === 'true'}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                isActive: e.target.checked ? 'true' : '',
              }))
            }
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">Is Active</label>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default PostFilter;
