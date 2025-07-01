import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import axios from 'axios';
import { FaFilter, FaTh, FaThLarge } from 'react-icons/fa';

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid-4');

  const sortBy = searchParams.get("sortBy") || "";

  const handleSortChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value === "") newParams.delete("sortBy");
    else newParams.set("sortBy", value);
    setSearchParams(newParams);
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'grid-3':
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3';
      case 'grid-4':
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 'grid-6':
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6';
      default:
        return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          collection,
          category: searchParams.get('category'),
          door: searchParams.get('door'),
          color: searchParams.get('color'),
          sizes: searchParams.getAll('sizes').filter(size => size !== ''),
          brand: searchParams.get('brand'),
          sortBy: searchParams.get('sortBy'),
          search: searchParams.get('search'),
          limit: 1000,
          timestamp: new Date().getTime(),
        };

        Object.keys(params).forEach((key) => {
          if (!params[key] || (Array.isArray(params[key]) && params[key].length === 0)) {
            delete params[key];
          }
        });

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/filter`, {
          params,
          signal,
        });

        setProducts(response.data.products || []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Error fetching products:', err);
          setError("Failed to fetch products");
        }
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchProducts, 250);
    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [collection, searchParams.toString()]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-[120px] sm:pt-[140px] px-2">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div
  ref={sidebarRef}
  className={`
    fixed inset-y-0 left-0 z-50 
    w-full max-w-sm 
    bg-white border-r border-gray-200 overflow-y-auto 
    transform transition-transform duration-300 
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    lg:translate-x-0 lg:static lg:block lg:h-[calc(100vh-72px)] lg:sticky lg:top-[72px]`}
>
  <FilterSidebar />
</div>


        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
            <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
              <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded"
                  >
                    <FaFilter className="w-4 h-4" />
                  </button>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {loading ? 'Yükleniyor...' : `${products.length} ürünün 1-24 arası gösteriliyor`}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end sm:justify-start">
                  <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded p-1">
                    <button
                      onClick={() => setViewMode('grid-3')}
                      className={`p-2 rounded ${viewMode === 'grid-3' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <FaThLarge className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid-4')}
                      className={`p-2 rounded ${viewMode === 'grid-4' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <FaTh className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid-6')}
                      className={`p-2 rounded ${viewMode === 'grid-6' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <div className="w-3 h-3 grid grid-cols-3 gap-0.5">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="bg-current w-full h-full rounded-xs"></div>
                        ))}
                      </div>
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    Göster: <span className="font-medium">24</span> / <span className="font-medium">48</span>
                  </div>
                  <SortOptions value={sortBy} onChange={handleSortChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="px-2 sm:px-4 lg:px-6 py-4 sm:py-5">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">Ürün bulunamadı</p>
              </div>
            ) : (
              <div className={`grid ${getGridClasses()} gap-3 sm:gap-4 md:gap-6`}>
                {products.map((product, index) => {
                  const images = product.images && typeof product.images === 'object'
                    ? Object.values(product.images)
                    : [];
                  const primaryImage = images[0] || product.image || '/default-image.jpg';
                  const secondaryImage = images[1];
                  const hasSecondImage = !!secondaryImage;

                  return (
                    <div key={product._id || index} className="group relative min-h-[300px] sm:min-h-[360px]">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-yellow-300 text-[10px] font-medium px-1.5 py-0.5 rounded-sm">
                          YENİ
                        </span>
                      </div>

                      <Link to={`/product/${product._id}`} className="block">
                        <div className="relative bg-gray-50 aspect-square mb-3 overflow-hidden">
                          <img
                            src={primaryImage}
                            alt={product.altText || product.name || 'Product'}
                            className={`w-full h-full object-contain transition-all duration-500 ${hasSecondImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                            onError={(e) => { e.target.src = '/default-image.jpg'; }}
                          />
                          {hasSecondImage && (
                            <img
                              src={secondaryImage}
                              alt="Product preview"
                              className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                const firstImage = e.target.parentElement.querySelector('img:first-child');
                                if (firstImage) {
                                  firstImage.className = firstImage.className.replace('group-hover:opacity-0', 'group-hover:scale-105');
                                }
                              }}
                            />
                          )}
                        </div>

                        <div className="text-center px-2">
                          <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-1 hover:text-black transition-colors">
                            {product.name || 'Unnamed Product'}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">
                            {product.brand || 'Brand'}
                          </p>
                          {/* Price kaldırıldı */}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CollectionPage;
