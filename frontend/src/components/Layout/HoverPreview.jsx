import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

const sampleHotspots = [
    {
      id: 1,
      name: 'Koltuk',
      description: 'Geniş ve modern koltuk takımı.',
      image:
        'https://cdn.novamobili.it/image/upload/f_auto/q_90/v1/cdn.novamobili.it/stil_divano_noa?_a=BBGAEtBp0',
      x: 30.5,
      y: 47,
    },
    {
      id: 2,
      name: 'Sehpa',
      description: 'Minimalist orta sehpa.',
      image: '/images/sehpa.jpg',
      x: 57,
      y: 92,
    },
    {
      id: 3,
      name: 'Sandalye',
      description: 'Yemek masası sandalyesi.',
      image:
        'https://cdn.novamobili.it/image/upload/f_auto/q_90/v1/cdn.novamobili.it/stil_divano_noa?_a=BBGAEtBp0',
      x: 82,
      y: 42.5,
    },
  ];
  

const HoverPreview = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setImgSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="relative max-w-[1400px] overflow-hidden px-4 mx-auto" ref={containerRef}>
        <img
          src="https://cdn.novamobili.it/image/upload/c_limit,w_2000/f_auto/q_85/v1/cdn.novamobili.it/divani_noa_Novamobili_HSDI-2021_118-119?_a=BBGAEtBp0"
          alt="Background"
          className="w-full h-auto object-contain"
          onLoad={() => {
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              setImgSize({ width: rect.width, height: rect.height });
            }
          }}
        />

        {imgSize.width > 0 &&
          sampleHotspots.map((spot) => {
            const left = `${(spot.x / 100) * imgSize.width}px`;
            const top = `${(spot.y / 100) * imgSize.height}px`;

            return (
              <div
                key={spot.id}
                className="absolute"
                style={{
                  top,
                  left,
                  transform: 'translate(-50%, -100%)',
                  zIndex: 10,
                }}
                onMouseEnter={() => {
                  clearTimeout(timeoutRef.current);
                  setHoveredId(spot.id);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => {
                    setHoveredId(null);
                  }, 150);
                }}
              >
                <div className="relative flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    animate={
                      hoveredId === spot.id
                        ? { scale: 1, rotate: 180 }
                        : { scale: [1, 1.2, 1], rotate: 0 }
                    }
                    transition={{
                      scale: {
                        duration: 1,
                        repeat: hoveredId === spot.id ? 0 : Infinity,
                        ease: 'easeInOut',
                      },
                      rotate: {
                        duration: 0.3,
                        ease: 'easeInOut',
                      },
                    }}
                    className="w-0 h-0 border-l-[26px] border-l-transparent border-r-[22px] border-r-transparent border-b-[18px] border-b-gray-300"
                  />
{hoveredId === spot.id && (
  <div
    className="absolute z-50 p-5 bg-white shadow-2xl rounded-xl transition-all duration-300"
    style={{
      top: '-250px',
      left: '340%',
      transform: 'translateX(-50%)',
      width: '250px', // Kutu genişliği artırıldı
    }}
    onMouseEnter={() => clearTimeout(timeoutRef.current)}
    onMouseLeave={() => {
      timeoutRef.current = setTimeout(() => {
        setHoveredId(null);
      }, 150);
    }}
  >
    <img
      src={spot.image}
      alt={spot.name}
      className="w-full h-32 object-cover mb-3 rounded-lg" // Resim genişliği tam kutu boyutuna göre
    />
    <h3 className="text-base font-semibold mb-1">{spot.name}</h3>
    <p className="text-sm">{spot.description}</p>
    <a
      href="/product/67e1fcf3dca4b7cedd8f2a56"
      className="mt-4 inline-block w-full py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition text-center"
    >
      View Details
    </a>
  </div>
)}

                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HoverPreview;
