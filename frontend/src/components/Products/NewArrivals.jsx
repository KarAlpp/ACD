import React, { useEffect, useRef, useState } from 'react';
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

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(leftScroll < rightScrollable);
    }
  };

  const scroll = (direction) => {
    const scrollAmount = 500;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(updateScrollButtons, 400);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="w-full py-20 text-white relative overflow-hidden bg-[#c8c7cf]">
      {/* Sol Dikey Yazı */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-white font-semibold text-sm tracking-widest pl-2 uppercase">
        New Arrivals
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white">New Arrivals</h2>
            <p className="text-gray-300 mt-2 max-w-xl">
              Discover our latest furniture designs, elevating your space with contemporary elegance
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className={`p-3 rounded-full border border-gray-400 hover:bg-white hover:text-black transition-all duration-200 ${
                !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
              }`}
              disabled={!canScrollLeft}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-3 rounded-full border border-gray-400 hover:bg-white hover:text-black transition-all duration-200 ${
                !canScrollRight ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
              }`}
              disabled={!canScrollRight}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable horizontal product list */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
        >
          {newArrivals.map((product) => {
            const imageUrl =
              product.images && typeof product.images === 'object' && Object.keys(product.images).length > 0
                ? Object.values(product.images)[0]
                : product.image || '/default-image.jpg';

            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="flex-shrink-0 w-[300px] md:w-[350px] group"
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    loading="lazy"
                    src={imageUrl}
                    alt={product.altText || product.name}
                    className="w-full h-[400px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => (e.target.src = '/default-image.jpg')}
                  />
                </div>
                <h3 className="mt-4 font-semibold text-white text-lg text-center">{product.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default NewArrivals;
