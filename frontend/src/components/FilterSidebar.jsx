import React from "react";

const FilterSidebar = ({ allProducts }) => {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategory = ["All", ...new Set(Categories)];
  console.log(Categories);
  return <div></div>;
};

export default FilterSidebar;
