import React from 'react'

const SortOptions = () => {
  return (
    <div>
      
    </div>
  )
}

export default SortOptions

/*import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const SortOptions = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;

    const newParams = new URLSearchParams(searchParams);

    if (sortBy === "") {
      newParams.delete("sortBy");
    } else {
      newParams.set("sortBy", sortBy);
    }

    // ✅ navigate ile parametreyi güncelle
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
*/