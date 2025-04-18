import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
      setNewArrivals(response.data);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 350;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(leftScroll < rightScrollable);

      const gradientText = document.getElementById("gradientText");
      const scrollPercentage = Math.min(100, Math.max(0, (leftScroll / rightScrollable) * 100));
      gradientText.style.backgroundSize = `${scrollPercentage}% 100%`;
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="w-[1280px] mx-auto px-4 text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p
          id="gradientText"
          className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-800 bg-no-repeat transition-all duration-150 ease-linear"
          style={{ backgroundSize: '0% 100%' }}
        >
          Discover the latest furniture designs, styles, and trends for every room in your home, from contemporary to classic elegance.
        </p>

        <div className="absolute right-4 bottom-[-30px] flex space-x-4">
          <button
            onClick={() => scroll('left')}
            className={`p-3 rounded-full bg-white shadow-md hover:bg-gray-400 transition-all duration-150 ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!canScrollLeft}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-3 rounded-full bg-white shadow-md hover:bg-gray-200 transition-all duration-150 ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!canScrollRight}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="w-[1280px] mx-auto px-4 overflow-x-auto flex gap-6 scroll-smooth pb-2"
      >
        {newArrivals.map((product) => {
          const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;
          return (
            <div
              key={product._id}
              className="flex-shrink-0"
              style={{
                width: '360px',
                height: '460px',
              }}
            >
              <img
                src={imageUrl || '/default-image.jpg'}
                alt={product.altText || product.name || 'Product Image'}
                className="w-full h-[360px] object-cover rounded-lg"
                onError={(e) => (e.target.src = '/default-image.jpg')}
              />

              <div
                className="text-white p-4 rounded-b-lg"
                style={{
                  backgroundColor: "rgba(50, 43, 40, 0.6)",
                  position: 'relative',
                }}
              >
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium text-sm md:text-base">{product.name || 'No Name'}</h4>
                  <p className="mt-1 text-sm md:text-base">${product.price || 'N/A'}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewArrivals;
