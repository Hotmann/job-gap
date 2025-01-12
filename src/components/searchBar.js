import React from "react";

const SearchBar = ({ query, setQuery, placeholder }) => {
  return (
    <div className="mb-6">
        <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
    </div>
  );
};

export default SearchBar;
