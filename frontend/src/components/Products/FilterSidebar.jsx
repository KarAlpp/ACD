import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: [],
    door: '',       // düzeltildi (önce array'di)
    color: '',
    sizes: [],
    brand: '',
  });

  const categories = ["Living Room", "Bedroom ", "Dining Room", "Garden Bench ", "Bergère ", "Sofa & Couch" ,"Table & Chair","Pouf", "Swing "];
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

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFilters((prev) => {
      const updated = { ...prev };

      if (type === "checkbox") {
        updated[name] = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
      } else {
        updated[name] = value;
      }

      return updated;
    });
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams); // mevcut parametreleri al
  
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
              onChange={handleFilterChange}
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
          <label key={d} className="flex items-center">
            <input
              type="radio"
              name="door"
              value={d}
              checked={filters.door === d}
              onChange={handleFilterChange}
              className="mr-2 accent-black"
            />
            {d}
          </label>
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
              onChange={handleFilterChange}
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
