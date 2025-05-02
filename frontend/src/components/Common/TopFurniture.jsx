import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TopFurniture = () => {
  const containerRef = useRef(null);
  const [topFurniture, setTopFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTopFurniture = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/`);
        const data = await response.json();

        const productsArray = Array.isArray(data) ? data : [data];

        const validProducts = productsArray.filter(
          (product) => product && product._id && product.name && product.images && Object.keys(product.images).length > 0
        );

        setTopFurniture(validProducts.slice(0, 8));
        setError(null);
      } catch (err) {
        console.error("Error fetching top furniture:", err);
        setError("Failed to load top furniture.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopFurniture();
  }, []);

  useEffect(() => {
    // Rotate through product highlights every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (topFurniture.length || 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [topFurniture.length]);

  useEffect(() => {
    if (!containerRef.current || topFurniture.length === 0 || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = containerRef.current.querySelectorAll('.product-card');
            items.forEach((item, index) => {
              item.style.transition = `opacity 0.6s ease, transform 0.8s ease ${index * 0.1}s`;
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [topFurniture, loading]);

  if (loading) {
    return (
      <section className="py-20 flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            FURNITURE HIGHLIGHTS
          </h2>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            FURNITURE HIGHLIGHTS
          </h2>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 flex justify-center w-full bg-white">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            THE HIGHLIGHTS OF THE MOMENT
          </h2>
          {topFurniture.length > 0 && (
            <div className="h-10">
              <p
                key={topFurniture[currentIndex]._id}
                className="text-2xl md:text-3xl font-bold text-gray-600 transition-opacity duration-500"
              >
                {topFurniture[currentIndex].name}
              </p>
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {topFurniture.map((product, index) => {
            const imageUrl =
              product.images?.main ||
              (typeof product.images === 'object' ? Object.values(product.images)[0] : null) ||
              'https://placehold.co/400x400?text=No+Image';

            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className={`product-card flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white opacity-0 transform ${
                  index % 2 === 0 ? 'translate-y-8' : 'translate-y-12'
                }`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#fef7e5] group">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x400?text=Image+Missing';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
                      <p className="font-medium">View Details</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col items-start flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {product.description || "Discover elegant furniture pieces to elevate your living space."}
                  </p>
                  <div className="mt-auto">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      {product.category || "Furniture"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopFurniture;