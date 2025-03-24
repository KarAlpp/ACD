import { User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const containerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const newArrivals = [
        { _id: '1', name: 'Modern Koltuk', price: 1451, image: { url: 'https://picsum.photos/200?random=1', altText: 'Modern Koltuk' } },
        { _id: '2', name: 'Ahşap Masa', price: 1999, image: { url: 'https://picsum.photos/200?random=2', altText: 'Ahşap Masa' } },
        { _id: '3', name: 'Şık Sandalye', price: 850, image: { url: 'https://picsum.photos/200?random=3', altText: 'Şık Sandalye' } },
        { _id: '4', name: 'Klasik Sehpa', price: 620, image: { url: 'https://picsum.photos/200?random=4', altText: 'Klasik Sehpa' } },
        { _id: '5', name: 'Minimalist Kitaplık', price: 2150, image: { url: 'https://picsum.photos/200?random=5', altText: 'Minimalist Kitaplık' } },
        { _id: '6', name: 'Konforlu Yatak', price: 3500, image: { url: 'https://picsum.photos/200?random=6', altText: 'Konforlu Yatak' } },
        { _id: '7', name: 'Lambader', price: 499, image: { url: 'https://picsum.photos/200?random=7', altText: 'Lambader' } },
        { _id: '8', name: 'Şık TV Ünitesi', price: 2899, image: { url: 'https://picsum.photos/200?random=8', altText: 'Şık TV Ünitesi' } }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".animated-word",
                { opacity: 0, transform: "translate3d(0, 20px, 0) rotateY(10deg) rotateX(10deg)" },
                { opacity: 1, transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", ease: "power2.inOut", stagger: 0.02, scrollTrigger: {
                        trigger: containerRef.current,
                        start: "100 bottom",
                        end: "center bottom",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={clsx("animated-title", "container mx-auto text-center mb-10 relative")}>            
            <h2 className="text-3xl font-bold mb-4 animated-word">Explore New Arrivals</h2>
            <p className='text-lg text-gray-600 mb-8 animated-word'>Discover the latest furniture designs and styles.</p>
            <div ref={scrollRef} className="container mx-auto overflow-x-auto flex space-x-6 relative whitespace-nowrap snap-x scroll-smooth">
                {newArrivals.map((product) => (
                    <div key={product._id} className="relative min-w-[100%] sm:min-w-[50%] lg:min-w-[33%]">
                        <img 
                            src={product.image.url} 
                            alt={product.image.altText || product.name} 
                            className="w-full h-auto rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 text-white p-4 rounded-b-lg" style={{ backgroundColor: "rgba(50, 43, 40, 0.6)" }}>
                            <Link to={`/product/${product._id}`} className="block">
                                <h4 className="font-medium animated-word">{product.name}</h4>
                                <p className="mt-1 animated-word">${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;