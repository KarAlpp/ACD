import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import indoorimage from '../../assets/indoor1.png';
import outdoorimage from '../../assets/outdoor1.png';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const IndoorOutdoor = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = containerRef.current.children;

            // Indoor animasyonu (soldan gel, 3D dönüş)
            gsap.fromTo(
                elements[0],
                {
                    opacity: 0,
                    x: -200,
                    rotateY: 60,
                    rotateX: -40,
                    filter: 'blur(10px)',
                },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: elements[0],
                        start: 'top 80%',
                        end: 'top 60%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Outdoor animasyonu (sağdan gel, 3D dönüş)
            gsap.fromTo(
                elements[1],
                {
                    opacity: 0,
                    x: 200,
                    rotateY: -60,
                    rotateX: -40,
                    filter: 'blur(10px)',
                },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: elements[1],
                        start: 'top 80%',
                        end: 'top 60%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();  // GSAP context temizleme
    }, []);

    // Hover animasyonu
    const handleMouseEnter = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1.1,
            y: -10,
            filter: 'brightness(1.2)',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            y: 0,
            filter: 'brightness(1)',
            boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    return (
        <section className="py-16 px-4 lg:px-0">
            <div ref={containerRef} className="container mx-auto flex flex-col md:flex-row gap-8">
                
                {/* Indoor Section */}
                <div
                    className="relative flex-1 cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={indoorimage} alt="Indoor" className="w-full h-full object-cover" />
                    <div
                        className="absolute bottom-8 left-8 p-6 rounded-lg shadow-lg z-50"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Indoor Products</h2>
                        <Link to="/collections/all?door=indoor"

    className="text-gray-900 font-semibold underline hover:text-gray-700 transition"
>
    Shop Now
</Link>

                    </div>
                </div>

                {/* Outdoor Section */}
                <div
                    className="relative flex-1 cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={outdoorimage} alt="Outdoor" className="w-full h-full object-cover" />
                    <div
                        className="absolute bottom-8 left-8 p-6 rounded-lg shadow-lg z-50"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Outdoor Products</h2>
                        <Link
                            to="/collections/all?door=outdoor"
                            className="text-gray-900 font-semibold underline hover:text-gray-700 transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default IndoorOutdoor;
