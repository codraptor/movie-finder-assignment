import React from 'react';

const SortFilter = ({ onSortChange, onFilterChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex justify-center space-x-6 my-4">
      {/* Sort by Year */}
      <select onChange={handleSortChange} className="p-2 rounded-lg text-black">
        <option value="asc">Sort by Year (Ascending)</option>
        <option value="desc">Sort by Year (Descending)</option>
      </select>

      {/* Filter by Decade */}
      <select onChange={handleFilterChange} className="p-2 rounded-lg text-black">
        <option value="">Filter by Decade</option>
        <option value="1980s">1980s</option>
        <option value="1990s">1990s</option>
        <option value="2000s">2000s</option>
        <option value="2010s">2010s</option>
        <option value="2020s">2020s</option>
      </select>
    </div>
  );
};

export default SortFilter;
