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

        const productsArray = Array.isArray(response.data)
          ? response.data
          : [response.data];

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
    if (!containerRef.current || topFurniture.length === 0 || loading) return;

    const items = containerRef.current.querySelectorAll('.product-card');

    gsap.fromTo(
      items,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
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
          <p>Loading products...</p>
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
    <section className="mt-16 flex justify-center w-full">
      <div className="w-full max-w-screen-2xl px-4">
      <h2 className="text-left text-[24px] tracking-widest font-normal text-[#3c3c3b] uppercase mb-8">
  THE HIGHLIGHTS OF THE MOMENT
</h2>

        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {topFurniture.map((product) => {
            const imageUrl =
              product.images?.main ||
              (typeof product.images === 'object' ? Object.values(product.images)[0] : null) ||
              'https://placehold.co/400x400?text=No+Image';

            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="product-card flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-lg p-2 bg-white"
              >
                <div className="w-full aspect-[3/4] overflow-hidden rounded-lg bg-[#fef7e5]">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x400?text=Image+Missing';
                    }}
                  />
                </div>
                <h3 className="mt-4 text-center text-base font-medium text-gray-800 line-clamp-2">
                  {product.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopFurniture;
