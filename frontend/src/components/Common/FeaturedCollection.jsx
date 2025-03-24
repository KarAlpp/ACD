import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedCollection = ({ featuredImage }) => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1, // Yavaşça akması için
            }
        });

        // Arka plan opacity animasyonu
        tl.fromTo(bgRef.current, 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1 }
        );

        // Sol taraftaki metinler soldan kayarak gelsin
        tl.fromTo(textRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1 },
            "-=0.5" // Arka planla biraz örtüşsün
        );

        // Sağdaki resim sağdan kayarak gelsin
        tl.fromTo(imageRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 1 },
            "-=0.5"
        );
    }, []);

    return (
        <section ref={sectionRef} className="py-16 px-4 lg:px-0">
            <div 
                ref={bgRef}
                className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl overflow-hidden max-w-screen-xl"
            >
                {/* Sol İçerik */}
                <div 
                    ref={textRef}
                    className="lg:w-1/2 p-8 md:p-24 text-center lg:text-left"
                >
                    <h2 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                        Comfort and Style
                    </h2>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        Apparel made for your everyday life
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Discover high-quality, comfortable clothing that effortlessly blends fashion and 
                        function. Designed to make you look and feel great every day.
                    </p>
                    <a 
                        href="collections/all" 
                        className="inline-block bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition"
                    >
                        Shop Now
                    </a>
                </div>

                {/* Sağ İçerik (Görsel) */}
                <div 
                    ref={imageRef}
                    className="lg:w-1/2 h-96 md:h-[500px]"
                >
                    <img
                        src='https://www.polywood.com/cdn/shop/files/Elevate-GingerCurtis-ClientConsult-SI-4.jpg?v=1736358793&width=2559'
                        alt="Featured Collection"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
