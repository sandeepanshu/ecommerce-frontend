import React from "react";

const CategoryFilter = ({ selected, onChange }) => {
  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Categories</option>
      <option value="Milk">Milk</option>
      <option value="Butter">Butter</option>
      <option value="Dahi">Dahi</option>
    </select>
  );
};

export default CategoryFilter;
