import React, { useState } from "react";
import Select from "react-select";

// Define the filter options
const filterOptions = [
  { value: "newest", label: "Newest" },
  { value: "unanswered", label: "Unanswered" },
  { value: "most-voted", label: "Most Voted" },
  { value: "recent-activity", label: "Recent Activity" },
  { value: "no-answers", label: "No Answers" },
];

const FilterDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div className="w-full max-w-lg">
      <Select
        isMulti
        instanceId="filter-select"
        options={filterOptions}
        value={selectedOptions}
        onChange={setSelectedOptions}
        placeholder="Select filters..."
        
      />
    </div>
  );
};

export default FilterDropdown;
