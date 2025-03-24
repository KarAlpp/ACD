import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sortBy = searchParams.get("sortBy") || "";

    const handleSortChange = (e) => {
        const value = e.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (value === "") {
            newParams.delete("sortBy");
        } else {
            newParams.set("sortBy", value);
        }

        setSearchParams(newParams);
    };

    useEffect(() => {
        const controller = new AbortController(); // Yeni abort controller oluştur
        const signal = controller.signal;
    
        const fetchProducts = async () => {
            try {
                setLoading(true);
                console.log("Fetching triggered by:", { collection, params: searchParams.toString() });
    
                const params = {
                    collection,
                    category: searchParams.get('category'),
                    door: searchParams.get('door'),
                    color: searchParams.get('color'),
                    sizes: searchParams.getAll('sizes').filter(size => size !== ''),
                    brand: searchParams.get('brand'),
                    sortBy: searchParams.get('sortBy'),
                    search: searchParams.get('search'), // 👈 Burası eklendi!
                    timestamp: new Date().getTime(),
                };
                
    
                Object.keys(params).forEach((key) => {
                    if (!params[key] || (Array.isArray(params[key]) && params[key].length === 0)) {
                        delete params[key];
                    }
                });
    
                const startTime = Date.now();
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/filter`, { params, signal });
                const endTime = Date.now();
                console.log(`API Yanıt Süresi: ${endTime - startTime}ms`);
    
                setProducts(response.data.products || []);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("API call cancelled:", err.message);
                } else {
                    console.error('Error fetching products:', err);
                    setError("Failed to fetch products");
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    
        return () => {
            controller.abort(); // Yeni çağrı geldiğinde eskisini iptal et
        };
    }, [collection, searchParams.toString()]);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col lg:flex-row pt-24">
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex items-center">
                <FaFilter className="mr-2" /> Filters
            </button>

            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300
                    lg:static lg:translate-x-0`}
            >
                <FilterSidebar isSidebarOpen={isSidebarOpen} />
            </div>

            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>

                <SortOptions value={sortBy} onChange={handleSortChange} />

                <div className="mb-4 flex flex-wrap gap-2">
                    {searchParams.get('category') && (
                        <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                            Category: {searchParams.get('category')}
                        </div>
                    )}
                    {searchParams.get('color') && (
                        <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                            Color: {searchParams.get('color')}
                        </div>
                    )}
                    {searchParams.get('door') && (
                        <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                            Door: {searchParams.get('door')}
                        </div>
                    )}
                    {searchParams.get('brand') && (
                        <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                            Brand: {searchParams.get('brand')}
                        </div>
                    )}
                    
                    {searchParams.getAll('sizes').filter(size => size !== '').map(size => (
                        <div key={size} className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                            Size: {size}
                        </div>
                    ))}
                </div>

                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <div key={product._id || index} className="rounded-lg p-4 hover:shadow-lg transition">
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={product.images || '/default-image.jpg'}
                                        alt={product.altText || product.name || 'Product'}
                                        className="w-90 h-120 object-cover rounded-md"
                                        onError={(e) => (e.target.src = '/default-image.jpg')}
                                    />
                                    <h3 className="mt-2 text-lg font-semibold">{product.name || 'No Name'}</h3>
                                    <p className="text-gray-600">${product.price || 'N/A'}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionPage;
