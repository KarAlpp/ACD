import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: [],
    door: '',
    color: '',
    sizes: [],
    brand: '',
  });

  const categories = ["Living Room", "Bedroom", "Dining Room", "Garden Bench ", "Bergère", "Sofa & Couch" ,"Table & Chair","Pouf", "Swing "];
  const colors = ["White", "Black", "Brown", "Gray", "Beige", "Wood"];
  const sizes = ["Small", "Medium", "Large"];
  const materials = ["SIFAS", "OLTA", "FERMOB"];
  const doors = ["indoor", "outdoor"];

  // URL'den filtreleri başlat
  useEffect(() => {
    const doorFromParams = searchParams.get('door');
    const categoryFromParams = searchParams.get('category');
    const colorFromParams = searchParams.get('color');
    const brandFromParams = searchParams.get('brand');
    const sizesFromParams = searchParams.getAll('sizes');

    setFilters({
      door: doorFromParams || '',
      category: categoryFromParams ? categoryFromParams.split(',') : [],
      color: colorFromParams || '',
      brand: brandFromParams || '',
      sizes: sizesFromParams || [],
    });
  }, []); // sadece ilk render'da çalışır

  const handleCategoryToggle = (category) => {
    setFilters((prev) => {
      const currentCategories = prev.category;
      const isCategorySelected = currentCategories.includes(category);
      
      return {
        ...prev,
        category: isCategorySelected 
          ? currentCategories.filter(cat => cat !== category)
          : [...currentCategories, category]
      };
    });
  };

  const handleDoorFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      door: prev.door === value ? '' : value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;

    setFilters((prev) => {
      const updated = { ...prev };
      updated[name] = value;
      return updated;
    });
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
  
    // filtre parametrelerini temizle
    currentParams.delete('category');
    currentParams.delete('door');
    currentParams.delete('color');
    currentParams.delete('sizes');
    currentParams.delete('brand');
  
    // filtre parametrelerini yeniden ekle
    Object.keys(filters).forEach((key) => {
      const val = filters[key];
      if (Array.isArray(val) && val.length > 0) {
        currentParams.set(key, val.join(','));
      } else if (typeof val === 'string' && val.trim() !== '') {
        currentParams.set(key, val);
      }
    });
  
    setSearchParams(currentParams, { replace: true });
  }, [filters, setSearchParams]);
  

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filters</h3>

      {/* Category */}
      <div className="mb-4">
        <label className="block font-medium">Category</label>
        {categories.map((cat) => (
          <label key={cat} className="flex items-center">
            <input
              type="checkbox"
              name="category"
              value={cat}
              checked={filters.category.includes(cat)}
              onChange={() => handleCategoryToggle(cat)}
              className="mr-2 accent-black"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Door (Indoor / Outdoor) */}
      <div className="mb-4">
  <label className="block font-medium">Furniture Type</label>
  {doors.map((d) => (
    <button
      key={d}
      type="button"
      onClick={() => handleDoorFilter(d)}
      className={`mr-2 mb-2 px-3 py-1 border rounded ${
        filters.door === d ? 'bg-black text-white' : 'bg-white text-black border-gray-400'
      }`}
    >
      {d}
    </button>
  ))}
</div>


      {/* Color */}
      <div className="mb-4">
        <label className="block font-medium">Color</label>
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() =>
              handleFilterChange({
                target: { name: 'color', value: color, type: 'button' },
              })
            }
            className={`w-8 h-8 border mr-2 mb-2 rounded ${
              filters.color === color ? 'border-black' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color.toLowerCase() }}
          />
        ))}
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <label className="block font-medium">Sizes</label>
        {sizes.map((size) => (
          <label key={size} className="flex items-center">
            <input
              type="checkbox"
              name="sizes"
              value={size}
              checked={filters.sizes.includes(size)}
              onChange={(e) => {
                const { value, checked } = e.target;
                setFilters((prev) => ({
                  ...prev,
                  sizes: checked 
                    ? [...prev.sizes, value]
                    : prev.sizes.filter(item => item !== value)
                }));
              }}
              className="mr-2 accent-black"
            />
            {size}
          </label>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-4">
        <label className="block font-medium">Brand</label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Select Brand</option>
          {materials.map((mat) => (
            <option key={mat} value={mat}>
              {mat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;