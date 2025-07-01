import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TopFurniture = () => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [topFurniture, setTopFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("New");

  const tabs = ["New", "Fermob", "Olta"];

  useEffect(() => {
    const fetchTopFurniture = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/`);
        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : [data];

        const validProducts = productsArray.filter(
          (product) =>
            product &&
            product._id &&
            product.name &&
            product.images &&
            Object.keys(product.images).length > 0
        );

        setTopFurniture(validProducts);
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

  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filteredData = () => {
    if (activeTab === "New") {
      return [...topFurniture].slice(-8).reverse();
    }
    if (activeTab === "Fermob") {
      const fermobProducts = topFurniture.filter(p => p.brand?.toLowerCase() === "fermob");
      return getRandomItems(fermobProducts, 8);
    }
    if (activeTab === "Olta") {
      const oltaProducts = topFurniture.filter(p => p.brand?.toLowerCase() === "olta");
      return getRandomItems(oltaProducts, 8);
    }
    return [];
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading || error) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Curated for You</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <p className="text-red-500">{error}</p>
        )}
      </section>
    );
  };

  return (
    <section className="py-20 bg-white px-4 relative">
      <div ref={containerRef} className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Curated for You
          </h2>
          <p className="text-gray-500 text-sm">
            A handpicked selection of standout pieces — updated weekly.
          </p>

          <div className="flex justify-center gap-8 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium pb-1 border-b-2 transition-all duration-300 ease-in-out ${
                  activeTab === tab
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:scale-105"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          ◀
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:scale-105"
          style={{ transform: "translate(50%, -50%)" }}
        >
          ▶
        </button>

        <div ref={scrollRef} className="flex gap-6 overflow-hidden scroll-smooth py-4">
          {filteredData().map((product) => {
            const images = Object.values(product.images || {});
            const image1 = images[0] || "https://placehold.co/400x400?text=No+Image";
            const image2 = images[1];
            const hasSecondImage = !!image2;

            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="min-w-[220px] max-w-[220px] bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 ease-in-out flex-shrink-0"
              >
                <div className="aspect-[3/4] bg-[#fef7e5] overflow-hidden rounded-t-xl relative group">
                  <img
                    src={image1}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      hasSecondImage ? "group-hover:opacity-0" : "group-hover:scale-110"
                    }`}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/400x400?text=Image+Missing";
                    }}
                  />
                  {hasSecondImage && (
                    <img
                      src={image2}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      onError={(e) => {
                        // Hide the second image if it fails to load, fallback to zoom effect on first image
                        e.target.style.display = 'none';
                        // Also remove the hasSecondImage behavior from the first image
                        const firstImage = e.target.parentElement.querySelector('img:first-child');
                        if (firstImage) {
                          firstImage.className = firstImage.className.replace('group-hover:opacity-0', 'group-hover:scale-110');
                        }
                      }}
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {product.description || "Effortless style. Designed to elevate."}
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                      {product.brand || product.category || "Furniture"}
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