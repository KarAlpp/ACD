import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const textRefs = useRef([]);
    const imageRefs = useRef([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [newArrivals, setNewArrivals] = useState([]);

    // Fetch New Arrivals from Backend
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

    useEffect(() => {
        if (textRefs.current.length === 0 || imageRefs.current.length === 0) return;

        gsap.fromTo(
            textRefs.current.filter(el => el), 
            { opacity: 0, y: 50, visibility: 'hidden' },
            {
                opacity: 1,
                y: 0,
                visibility: 'visible',
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: textRefs.current[0],
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: false,
                    once: true, // Animasyon sadece bir kez çalışır
                },
            }
        );

        gsap.fromTo(
            imageRefs.current.filter(el => el), 
            { opacity: 0, scale: 0.9, visibility: 'hidden' },
            {
                opacity: 1,
                scale: 1,
                visibility: 'visible',
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: scrollRef.current,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: false,
                    once: true, // Animasyon sadece bir kez çalışır
                },
            }
        );
    }, [newArrivals]);

    // Scroll Functions
    const scroll = (direction) => {
        const scrollAmount = 200;
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
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            return () => container.removeEventListener('scroll', updateScrollButtons);
        }
    }, [newArrivals]);

    return (
        <section className="mt-12">
            <div className="container mx-auto text-center mb-10 relative">
                <h2 ref={(el) => { if (el) textRefs.current[0] = el; }} className="text-3xl font-bold mb-4">
                    Explore New Arrivals
                </h2>
                <p ref={(el) => { if (el) textRefs.current[1] = el; }} className="text-lg text-gray-600 mb-8">
                    Discover the latest furniture designs and styles.
                </p>
                <div className="absolute right-0 bottom-[-30px] flex space-x-4">
                    <button
                        onClick={() => scroll('left')}
                        className={`p-3 rounded-full bg-white shadow-md hover:bg-gray-200 transition-all duration-300 
                        ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!canScrollLeft}
                    >
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className={`p-3 rounded-full bg-white shadow-md hover:bg-gray-200 transition-all duration-300 
                        ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!canScrollRight}
                    >
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Products Scrollable Section */}
            <div
                ref={scrollRef}
                className="container mx-auto overflow-x-auto flex space-x-6 relative whitespace-nowrap snap-x scroll-smooth cursor-grab active:cursor-grabbing"
            >
                {newArrivals.map((product, index) => {
                    const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;
                    return (
                        <div key={product._id} className="relative min-w-[100%] sm:min-w-[50%] lg:min-w-[33%]">
                            <img
                                ref={(el) => { if (el) imageRefs.current[index] = el; }}
                                src={imageUrl || '/default-image.jpg'}
                                alt={product.altText || product.name || 'Product Image'}
                                className="w-[500px] h-[450px] object-cover rounded-lg"
                                onError={(e) => (e.target.src = '/default-image.jpg')}
                            />

                            <div
                                ref={(el) => { if (el) textRefs.current[index + 2] = el; }}
                                className="absolute bottom-0 left-0 right-0 text-white p-4 rounded-b-lg"
                                style={{ backgroundColor: "rgba(50, 43, 40, 0.6)" }}
                            >
                                <Link to={`/product/${product._id}`} className="block">
                                    <h4 className="font-medium">{product.name || 'No Name'}</h4>
                                    <p className="mt-1">${product.price || 'N/A'}</p>
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
