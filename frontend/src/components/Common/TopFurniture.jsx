import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const TopFurniture = () => {
    const containerRef = useRef(null);
    const [topFurniture, setTopFurniture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopFurniture = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/`);
                
                // Handle both array and single object responses
                const productsArray = Array.isArray(response.data) ? response.data : [response.data];
                
                // Ensure we have at least 1 and at most 8 products
                const validProducts = productsArray.filter(product => 
                    product && product._id && (product.image?.url || (product.images && product.images.length > 0))
                );
                
                // Limit to exactly 8 products maximum
                const limitedProducts = validProducts.slice(0, 8);
                
                if (limitedProducts.length === 0) {
                    setError("No valid products found");
                } else {
                    setTopFurniture(limitedProducts);
                    setError(null);
                }
            } catch (error) {
                console.error("Error fetching top furniture:", error);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        
        fetchTopFurniture();
    }, []);

    useEffect(() => {
        if (!containerRef.current || topFurniture.length === 0 || loading) return;
        
        const items = containerRef.current.querySelectorAll('.product-card');
        
        gsap.fromTo(
            items,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, [topFurniture, loading]);

    if (loading) {
        return (
            <div className="mt-16 flex justify-center">
                <div className="w-full max-w-screen-2xl px-4 text-center">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Top Furniture Picks
                    </h2>
                    <p>Loading top furniture products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-16 flex justify-center">
                <div className="w-full max-w-screen-2xl px-4 text-center">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Top Furniture Picks
                    </h2>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-16 flex justify-center">
            <div className="w-full max-w-screen-2xl px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    Top Furniture Picks
                </h2>
                
                <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {topFurniture.map((product) => (
                        <Link 
                            to={`/product/${product._id}`} 
                            key={product._id} 
                            className="product-card flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-lg p-2"
                        >
                            <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
                                <img
                                    src={product.image?.url || (product.images && product.images.length > 0 ? product.images[0].url || product.images[0] : '')}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    onError={(e) => (e.target.src = '/default-image.jpg')}
                                />
                            </div>
                            <h3 className="mt-4 text-center text-base font-medium text-gray-800">
                                {product.name}
                            </h3>
                            <p className="text-center text-base text-gray-600">
                                ${product.price?.toFixed(2)}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopFurniture;