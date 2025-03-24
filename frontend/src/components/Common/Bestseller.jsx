import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Bestseller = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 }, // Başlangıç: aşağıda ve görünmez
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse', // Scroll yukarı çıkınca geri sar
          }
        }
      );
    });

    return () => ctx.revert(); // Temizleme
  }, []);

  return (
    <div className="py-16">
      <h2 ref={titleRef} className="text-3xl text-center font-bold mb-4">
        Best Sellers
      </h2>
    </div>
  );
};

export default Bestseller;
