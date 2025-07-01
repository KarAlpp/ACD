import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, X, Search } from 'lucide-react';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: [],
    door: '',
    color: '',
    sizes: [],
    brand: '',
  });

  const [colors, setColors] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    door: true,
    color: true,
    sizes: true,
    brand: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    "Living Room", "Bedroom", "Dining Room", "Garden Bench",
    "Bergère", "Sofa & Couch", "Table & Chair", "Pouf", "Swing"
  ];

  const sizes = ["Small", "Medium", "Large"];
  const brands = ["SIFAS", "OLTA", "FERMOB"];
  const doors = ["indoor", "outdoor"];

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const mockColors = [
          'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 
          'Pink', 'Brown', 'Black', 'White', 'Gray', 'Beige',
          'Navy', 'Teal', 'Maroon', 'Olive', 'Coral', 'Turquoise'
        ];
        setColors(mockColors);
      } catch (err) {
        console.error("Colors could not be loaded:", err);
      }
    };

    fetchColors();
  }, []);

  // ✅ 1. Başlangıçta URL'den filtreleri al
  useEffect(() => {
    const doorFromParams = searchParams.get('door');
    const categoryFromParams = searchParams.get('category');
    const colorFromParams = searchParams.get('color');
    const brandFromParams = searchParams.get('brand');
    const sizesFromParams = searchParams.get('sizes');

    setFilters({
      door: doorFromParams || '',
      category: categoryFromParams ? categoryFromParams.split(',') : [],
      color: colorFromParams || '',
      brand: brandFromParams || '',
      sizes: sizesFromParams ? sizesFromParams.split(',') : [],
    });
  }, []);

  // ✅ 2. Her filtre değiştiğinde URL güncelle
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category.length > 0) params.set('category', filters.category.join(','));
    if (filters.door) params.set('door', filters.door);
    if (filters.color) params.set('color', filters.color);
    if (filters.sizes.length > 0) params.set('sizes', filters.sizes.join(','));
    if (filters.brand) params.set('brand', filters.brand);

    setSearchParams(params, { replace: true });
  }, [filters]);

  const handleCategoryToggle = (category) => {
    setFilters((prev) => {
      const current = prev.category;
      const isSelected = current.includes(category);
      return {
        ...prev,
        category: isSelected
          ? current.filter((cat) => cat !== category)
          : [...current, category],
      };
    });
  };

  const handleDoorFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      door: prev.door === value ? '' : value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: [],
      door: '',
      color: '',
      sizes: [],
      brand: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter =>
    Array.isArray(filter) ? filter.length > 0 : filter !== ''
  );

  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border-r border-gray-100 h-full overflow-y-auto max-w-sm">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              <X size={16} />
              Clear All
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Category */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
          >
            <h3 className="font-semibold text-gray-900">Category</h3>
            {expandedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expandedSections.category && (
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {filteredCategories.map((cat) => (
                <label key={cat} className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={filters.category.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 transition-all ${
                      filters.category.includes(cat)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 group-hover:border-blue-300'
                    }`}>
                      {filters.category.includes(cat) && (
                        <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Furniture Type */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('door')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
          >
            <h3 className="font-semibold text-gray-900">Furniture Type</h3>
            {expandedSections.door ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expandedSections.door && (
            <div className="p-4 grid grid-cols-2 gap-2">
              {doors.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDoorFilter(d)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                    filters.door === d
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('color')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
          >
            <h3 className="font-semibold text-gray-900">Color</h3>
            {expandedSections.color ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expandedSections.color && (
            <div className="p-4 grid grid-cols-6 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    handleFilterChange({ target: { name: 'color', value: color } })
                  }
                  className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                    filters.color === color
                      ? 'border-gray-800 ring-2 ring-blue-500 ring-offset-2'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                >
                  {filters.color === color && (
                    <div className="w-full h-full rounded-full bg-black bg-opacity-20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('sizes')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
          >
            <h3 className="font-semibold text-gray-900">Sizes</h3>
            {expandedSections.sizes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expandedSections.sizes && (
            <div className="p-4 space-y-3">
              {sizes.map((size) => (
                <label key={size} className="flex items-center group cursor-pointer">
                  <div className="relative">
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
                            : prev.sizes.filter((item) => item !== value),
                        }));
                      }}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 transition-all ${
                      filters.sizes.includes(size)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 group-hover:border-blue-300'
                    }`}>
                      {filters.sizes.includes(size) && (
                        <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brand */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('brand')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
          >
            <h3 className="font-semibold text-gray-900">Brand</h3>
            {expandedSections.brand ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {expandedSections.brand && (
            <div className="p-4">
              <select
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
